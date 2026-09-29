const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/AttendanceTab.jsx',
  'src/components/DailyTaskTab.jsx',
  'src/components/LeaveRequestTab.jsx',
  'src/components/TasksTab.jsx',
  'src/components/TeamTab.jsx',
  'src/pages/Workspace.jsx'
];

filesToUpdate.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ exportToCSV \} from '\.\.\/utils\/exportUtils';/g, "import { exportToExcel } from '../utils/exportUtils';");
  content = content.replace(/exportToCSV\(/g, "exportToExcel(");
  content = content.replace(/\.csv/g, ".xlsx");
  content = content.replace(/Export CSV/g, "Export Excel");
  content = content.replace(/handleExportCSV/g, "handleExportExcel");
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
