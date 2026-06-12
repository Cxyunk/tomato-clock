const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

// 确保 data 目录和文件存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ taskPool: [], records: {} }, null, 2), 'utf-8');
}

// MIME 类型
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function readJSON(filepath) {
  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeJSON(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

let lastHeartbeat = Date.now();
const HEARTBEAT_TIMEOUT = 30000; // 30 秒无心跳则自动关闭

// 心跳检查定时器
const heartbeatCheck = setInterval(() => {
  if (Date.now() - lastHeartbeat > HEARTBEAT_TIMEOUT) {
    console.log('\n🔌 浏览器已关闭（30秒无心跳），服务自动停止...');
    clearInterval(heartbeatCheck);
    server.close();
    process.exit(0);
  }
}, 5000);

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // === API 路由 ===

  // GET /api/heartbeat — 心跳
  if (req.method === 'GET' && url.pathname === '/api/heartbeat') {
    lastHeartbeat = Date.now();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // GET /api/data — 获取全部数据
  if (req.method === 'GET' && url.pathname === '/api/data') {
    lastHeartbeat = Date.now();
    const data = readJSON(DATA_FILE);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
    return;
  }

  // PUT /api/data — 全量保存数据
  if (req.method === 'PUT' && url.pathname === '/api/data') {
    lastHeartbeat = Date.now();
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        writeJSON(DATA_FILE, data);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // POST /api/data — 追加记录（beforeunload 用）
  if (req.method === 'POST' && url.pathname === '/api/data') {
    lastHeartbeat = Date.now();
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload.action === 'saveRecord') {
          const data = readJSON(DATA_FILE);
          const today = new Date();
          const dateKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
          if (!data.records) data.records = {};
          if (!data.records[dateKey]) data.records[dateKey] = [];
          data.records[dateKey].push({
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            taskId: payload.taskId,
            name: payload.name,
            color: payload.color || '#ff6b6b',
            duration: payload.duration,
            completedAt: new Date().toISOString()
          });
          writeJSON(DATA_FILE, data);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ ok: true }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ ok: false, error: 'Unknown action' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // === 静态文件服务 ===
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  filePath = path.join(__dirname, filePath);

  // 安全检查：防止目录穿越
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🍅 番茄钟服务已启动 → http://localhost:${PORT}`);
  console.log(`📁 数据存储在: ${DATA_FILE}`);
  console.log(`⏱  关闭浏览器后 30 秒自动停止服务`);
  console.log(`   按 Ctrl+C 手动停止`);
});
