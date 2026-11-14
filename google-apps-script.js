/**
 * =========================================================================
 * קוד Google Apps Script עבור דשבורד המשימות של רחל
 * =========================================================================
 * 
 * הוראות התקנה ב-3 דקות:
 * 1. פתחי גיליון Google Sheets חדש (למשל תקראי לו "המשימות של רחל").
 * 2. בתפריט העליון לחצי על: הרחבות (Extensions) -> Apps Script.
 * 3. מחקי את מה שכתוב שם והדביקי את כל הקוד שלהלן.
 * 4. לחצי על סמל הדיסקט לשמירה (או Ctrl+S).
 * 5. לחצי על הכפתור הכחול למעלה: "פריסה" (Deploy) -> "פריסה חדשה" (New deployment).
 * 6. לחצי על גלגל השיניים בצד ובחרי "אפליקציית אינטרנט" (Web app).
 * 7. תחת "גישה" (Who has access) בחרי: "לכל אחד" (Anyone).
 * 8. לחצי על "פרוס" (Deploy), אשרי הרשאות, והעתיקי את ה-Web App URL שקיבלת.
 * 9. הדביקי את הקישור בהגדרות של הדשבורד (סמל גלגל השיניים).
 * =========================================================================
 */

function doGet(e) {
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ tasks: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var headers = data[0];
  var tasks = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var task = {};
    for (var j = 0; j < headers.length; j++) {
      var val = row[j];
      if (headers[j] === 'progress_log' && val) {
        try { 
          val = JSON.parse(val); 
        } catch(err) { 
          val = []; 
        }
      }
      if (headers[j] === 'completed') {
        val = (val === true || val === 'TRUE' || val === 'true');
      }
      task[headers[j]] = val;
    }
    tasks.push(task);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ tasks: tasks }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = getOrCreateSheet();
  var body = {};
  
  try {
    body = JSON.parse(e.postData.contents);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Action 1: סנכרון מלא של כל המשימות
  if (body.action === 'sync_all' && Array.isArray(body.tasks)) {
    sheet.clearContents();
    var headers = ['id', 'title', 'category', 'priority', 'source', 'waiting_for', 'check_date', 'due_date', 'notes', 'progress_log', 'completed', 'created_at', 'updated_at'];
    var rows = [headers];
    
    body.tasks.forEach(function(t) {
      rows.push([
        t.id || '',
        t.title || '',
        t.category || '',
        t.priority || '',
        t.source || '',
        t.waiting_for || '',
        t.check_date || '',
        t.due_date || '',
        t.notes || '',
        JSON.stringify(t.progress_log || []),
        t.completed ? true : false,
        t.created_at || '',
        t.updated_at || ''
      ]);
    });
    
    sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', count: body.tasks.length }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Action 2: הוספת משימה בודדת (שימושי עבור וובהוק מוואטסאפ או מ-Claude)
  if (body.action === 'add_task') {
    var headers = ['id', 'title', 'category', 'priority', 'source', 'waiting_for', 'check_date', 'due_date', 'notes', 'progress_log', 'completed', 'created_at', 'updated_at'];
    var newRow = [
      'task_' + Date.now(),
      body.title || 'משימה חדשה',
      body.category || 'אחר',
      body.priority || 'רגיל',
      body.source || 'נוסף מוואטסאפ',
      body.waiting_for || '',
      body.check_date || '',
      body.due_date || '',
      body.notes || '',
      JSON.stringify([]),
      false,
      new Date().toISOString(),
      new Date().toISOString()
    ];
    sheet.appendRow(newRow);
    return ContentService.createTextOutput(JSON.stringify({ status: 'task_added' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'unknown_action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('משימות');
  if (!sheet) {
    sheet = ss.insertSheet('משימות');
    var headers = ['id', 'title', 'category', 'priority', 'source', 'waiting_for', 'check_date', 'due_date', 'notes', 'progress_log', 'completed', 'created_at', 'updated_at'];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f1f5f9');
  }
  return sheet;
}
