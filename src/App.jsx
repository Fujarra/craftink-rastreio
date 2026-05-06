import { useState, useRef, useEffect } from "react";

// --- Supabase config --------------------------------------------------
const SUPABASE_URL = "https://uzheulxrxwjsucjjktsy.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aGV1bHhyeHdqc3VjamprdHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMjM2MDQsImV4cCI6MjA5MzU5OTYwNH0.20KH3c3PaqNfOj4EAK8OslWb_Znrsva69ZX4UFl1EjU";

const db = {
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON,
    "Authorization": `Bearer ${SUPABASE_ANON}`,
  },

  async getAll() {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pedidos?order=created_at.desc`, {
      headers: { ...this.headers, "Prefer": "return=representation" },
    });
    return r.ok ? r.json() : [];
  },

  async insert(order) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pedidos`, {
      method: "POST",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify(order),
    });
    const data = await r.json();
    return Array.isArray(data) ? data[0] : data;
  },

  async update(id, fields) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pedidos?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...this.headers, "Prefer": "return=representation" },
      body: JSON.stringify(fields),
    });
    const data = await r.json();
    return Array.isArray(data) ? data[0] : data;
  },

  async delete(id) {
    await fetch(`${SUPABASE_URL}/rest/v1/pedidos?id=eq.${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
  },

  async getById(id) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/pedidos?id=eq.${id}&limit=1`, {
      headers: this.headers,
    });
    const data = await r.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  },
};

// --- Logo SVG ---------------------------------------------------------
const LogoSVG = ({ height = 36 }) => (
  <svg height={height} viewBox="0 0 810.69 265.31" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
    <defs><style>{`.lc1{fill:#fff}.lc2{fill:#faea27}.lc3{fill:#e32285}.lc4{fill:#29abe3}`}</style></defs>
    <rect className="lc4" x="118.35" y="239.65" width="25.66" height="25.66"/>
    <rect className="lc3" x="521.82" y="8.67" width="25.66" height="25.66"/>
    <rect className="lc2" x="685.73" y="8.67" width="25.66" height="25.66"/>
    <rect className="lc1" x="25.8" y="188.32" width="77.15" height="25.66"/>
    <path className="lc1" d="M409.64,60.99h-58.04c-2.44,0-5,.28-7.7.84-2.7.56-5.38,1.43-8.05,2.62-2.66,1.18-5.22,2.71-7.65,4.59-2.44,1.88-4.59,4.15-6.47,6.81-1.88,2.67-3.37,5.74-4.49,9.23-1.12,3.49-1.68,7.44-1.68,11.85v117.07h25.66v-117.07c0-3.36.89-5.91,2.67-7.65,1.78-1.74,4.41-2.62,7.9-2.62h57.84v-25.66Z"/>
    <rect className="lc1" x="685.73" y="62.17" width="25.66" height="151.81"/>
    <path className="lc1" d="M810.69,107.08h-41.06l-46.89,37.81c-1.45,1.12-2.58,2.48-3.41,4.1-.82,1.61-1.3,3.34-1.43,5.18-.2,3.95,1.15,7.24,4.05,9.87l51.72,49.95h37.02l-60.41-58.24,60.41-48.66Z"/>
    <rect className="lc1" x="25.8" y="72.44" width="102.81" height="25.66"/>
    <rect className="lc1" x="0" y="98.1" width="25.8" height="64.55"/>
    <polygon className="lc1" points="565.08 162.66 565.08 188.32 565.08 213.98 590.74 213.98 590.74 188.32 590.74 162.66 590.74 136.99 565.08 136.99 565.08 162.66"/>
    <path className="lc1" d="M644.37,111.33h-53.63v25.66h51.33v76.99h25.66v-79.29c0-12.9-10.46-23.36-23.36-23.36Z"/>
    <polygon className="lc1" points="118.35 162.66 118.35 188.32 118.35 213.98 144.01 213.98 144.01 188.32 144.01 162.66 144.01 133.22 118.35 133.22 118.35 162.66"/>
    <polygon className="lc1" points="195.34 107.28 169.68 107.28 144.01 107.28 144.01 132.95 169.68 132.95 195.34 132.95 195.34 107.28"/>
    <path className="lc1" d="M287.09,115.23c-3.52-2.8-7.34-4.82-11.45-6.07-4.11-1.25-7.95-1.88-11.5-1.88h-56.36v24.38h56.36c3.16,0,5.77.99,7.85,2.96,2.07,1.97,3.11,4.64,3.11,8v35.83c0,3.16-.96,5.79-2.86,7.9-1.91,2.11-4.61,3.16-8.09,3.16h-46.1c-3.03,0-5.64-.94-7.85-2.81-2.21-1.88-3.31-4.49-3.31-7.85,0-3.16.95-5.81,2.86-7.95,1.91-2.14,4.61-3.21,8.09-3.21h46.29v-24.48h-46.29c-6.45,0-11.93,1.18-16.43,3.55-4.51,2.37-8.16,5.31-10.96,8.83-2.8,3.52-4.82,7.35-6.07,11.5-1.25,4.15-1.88,8-1.88,11.55,0,6.45,1.18,11.93,3.55,16.43,2.37,4.51,5.31,8.16,8.83,10.96,3.52,2.8,7.34,4.82,11.45,6.07,4.11,1.25,7.95,1.88,11.5,1.88h46.29c6.45,0,11.93-1.18,16.43-3.55,4.51-2.37,8.16-5.31,10.96-8.83,2.8-3.52,4.82-7.34,6.07-11.45,1.25-4.11,1.88-7.95,1.88-11.5v-36.03c0-6.45-1.18-11.93-3.55-16.43-2.37-4.51-5.31-8.16-8.83-10.96Z"/>
    <polygon className="lc1" points="522.02 60 496.55 60 496.35 60 470.89 60 470.89 85.66 496.35 85.66 496.55 85.66 521.82 85.66 521.82 111.33 521.82 136.99 521.82 162.66 521.82 188.32 521.82 213.98 547.48 213.98 547.48 188.32 547.48 162.66 547.48 136.99 547.48 111.33 547.48 85.66 522.02 85.66 522.02 60"/>
    <polygon className="lc1" points="458.39 111.33 458.39 85.66 458.39 60 432.73 60 432.73 85.66 432.73 111.33 408.21 111.33 382.74 111.33 382.55 111.33 357.08 111.33 357.08 136.99 382.55 136.99 382.74 136.99 408.21 136.99 432.73 136.99 432.73 162.66 432.73 188.32 432.73 213.98 458.39 213.98 458.39 188.32 458.39 162.66 458.39 136.99 484.06 136.99 484.06 111.33 458.39 111.33"/>
    <path className="lc1" d="M4.76,44.43c-2.24-1.66-3.35-3.9-3.35-6.7,0-.53.02-.91.06-1.16h5.42c-.16,1.75.35,3.17,1.55,4.27s2.93,1.65,5.21,1.65,4.11-.44,5.52-1.31c1.4-.87,2.1-2.1,2.1-3.69,0-1.34-.57-2.4-1.71-3.17-1.14-.77-2.89-1.61-5.24-2.5-2.07-.77-3.78-1.5-5.12-2.19-1.34-.69-2.48-1.66-3.41-2.9-.94-1.24-1.4-2.81-1.4-4.72s.54-3.54,1.62-5c1.08-1.46,2.58-2.59,4.51-3.38,1.93-.79,4.14-1.19,6.61-1.19,3.41,0,6.22.85,8.41,2.56s3.29,3.94,3.29,6.7c0,.53-.02.94-.06,1.22h-5.3l.06-.73c0-1.63-.62-2.91-1.86-3.87-1.24-.96-2.87-1.43-4.91-1.43s-3.63.45-4.9,1.34c-1.28.89-1.92,2.09-1.92,3.59,0,1.42.59,2.54,1.77,3.35,1.18.81,3.01,1.71,5.49,2.68,2.07.81,3.74,1.55,5,2.22,1.26.67,2.34,1.6,3.23,2.77.89,1.18,1.34,2.66,1.34,4.45,0,1.95-.58,3.66-1.74,5.12-1.16,1.46-2.76,2.58-4.79,3.35-2.03.77-4.33,1.16-6.89,1.16-3.49,0-6.36-.83-8.59-2.5Z"/>
    <path className="lc1" d="M41.82,37.24c-.12.61-.18,1.14-.18,1.59,0,1.02.31,1.75.95,2.19.63.45,1.65.67,3.08.67h4.09l-.85,4.69h-5c-2.64,0-4.62-.51-5.94-1.52-1.32-1.01-1.98-2.68-1.98-5,0-.89.08-1.77.24-2.62l3.47-19.69h-4.26l.79-4.57h4.33l1.46-8.41h5.61l-1.46,8.41h8.66l-.79,4.57h-8.71l-3.48,19.69Z"/>
    <path className="lc1" d="M91.13,12.98l-5.91,33.4h-5.55l.85-4.88c-1.34,1.71-3.05,3.03-5.12,3.96-2.07.94-4.23,1.4-6.46,1.4-3.49,0-6.29-.95-8.38-2.83-2.09-1.89-3.14-4.6-3.14-8.14,0-.89.1-2.01.31-3.35l3.47-19.57h5.49l-3.29,18.83c-.16.85-.24,1.75-.24,2.68,0,2.48.68,4.36,2.04,5.64,1.36,1.28,3.26,1.92,5.7,1.92,2.92,0,5.41-.92,7.46-2.74s3.36-4.49,3.93-7.98v.18l3.29-18.53h5.55Z"/>
    <path className="lc1" d="M99.14,20.57c1.85-2.58,4.12-4.58,6.8-6,2.68-1.42,5.52-2.13,8.53-2.13,2.56,0,4.86.6,6.89,1.8,2.03,1.2,3.47,2.77,4.33,4.72l3.11-17.68h5.61l-7.98,45.1h-5.61l1.16-6.28c-1.42,1.99-3.33,3.63-5.73,4.91-2.4,1.28-5.04,1.92-7.92,1.92-2.6,0-4.9-.56-6.89-1.68-1.99-1.12-3.54-2.71-4.66-4.79s-1.68-4.47-1.68-7.19c0-1.22.12-2.46.36-3.72.61-3.41,1.84-6.41,3.69-8.99ZM124.04,26.88c0-2.97-.88-5.31-2.65-7.04-1.77-1.73-4.01-2.59-6.74-2.59-2.07,0-4.05.49-5.94,1.46-1.89.97-3.51,2.4-4.85,4.26-1.34,1.87-2.23,4.06-2.68,6.58-.16.85-.25,1.79-.25,2.8,0,3.01.87,5.37,2.62,7.1,1.75,1.73,3.98,2.59,6.7,2.59,2.07,0,4.05-.5,5.94-1.49,1.89-.99,3.51-2.44,4.88-4.33,1.36-1.89,2.27-4.1,2.71-6.61.16-.85.24-1.77.24-2.74Z"/>
    <path className="lc1" d="M147.26,12.98l-5.91,33.4h-5.55l5.91-33.4h5.55ZM143.27,6.67c-.59-.59-.88-1.33-.88-2.22,0-1.22.45-2.27,1.34-3.14.89-.87,1.93-1.31,3.11-1.31.94,0,1.69.28,2.25.85s.85,1.32.85,2.25c0,1.22-.45,2.27-1.34,3.14-.89.87-1.93,1.31-3.11,1.31-.89,0-1.64-.29-2.23-.88Z"/>
    <path className="lc1" d="M158.08,45.19c-2.13-1.16-3.79-2.78-4.97-4.88s-1.77-4.52-1.77-7.28c0-3.78.87-7.24,2.62-10.39,1.75-3.15,4.15-5.64,7.22-7.47,3.07-1.83,6.49-2.74,10.27-2.74,2.81,0,5.29.58,7.47,1.74s3.86,2.79,5.06,4.88c1.2,2.09,1.8,4.54,1.8,7.35,0,3.78-.89,7.23-2.68,10.36-1.79,3.13-4.23,5.61-7.32,7.44-3.09,1.83-6.52,2.74-10.3,2.74-2.8,0-5.27-.58-7.41-1.74ZM173.29,40.08c2.11-1.44,3.77-3.35,4.97-5.73s1.8-4.93,1.8-7.65c0-3.09-.89-5.46-2.68-7.1s-4.02-2.47-6.7-2.47-5,.72-7.07,2.16c-2.07,1.44-3.68,3.36-4.82,5.76-1.14,2.4-1.71,4.98-1.71,7.74,0,3.01.85,5.33,2.56,6.98s3.88,2.47,6.52,2.47,5.02-.72,7.13-2.16Z"/>
  </svg>
);

// --- CSS --------------------------------------------------------------
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#2b2b2b;color:#fff;min-height:100vh;}
.accent-stripe{height:3px;background:linear-gradient(90deg,#29abe3 0%,#e32285 50%,#faea27 100%);}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;border-bottom:1px solid #383838;background:#1a1a1a;position:sticky;top:0;z-index:100;}
.nav-tabs{display:flex;gap:4px;}
.tab-btn{padding:8px 20px;border-radius:6px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:600;background:transparent;color:#888;transition:all .2s;}
.tab-btn:hover:not(.ac):not(.am){color:#fff;background:#383838;}
.tab-btn.ac{background:#29abe3;color:#1a1a1a;}
.tab-btn.am{background:#e32285;color:#fff;}
.admin{padding:40px 32px;max-width:1100px;margin:0 auto;}
.page-title{font-family:'Space Grotesk',sans-serif;font-size:1.7rem;font-weight:700;margin-bottom:4px;}
.page-sub{color:#888;font-size:.88rem;margin-bottom:32px;}
.order-form{background:#222;border:1px solid #383838;border-radius:14px;padding:28px;margin-bottom:36px;border-top:3px solid #29abe3;}
.form-ttl{font-size:.75rem;font-weight:700;color:#29abe3;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:20px;}
.form-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.fg{display:flex;flex-direction:column;gap:5px;}
.fg label{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:.8px;}
.fg input,.fg textarea{background:#1a1a1a;border:1px solid #383838;border-radius:8px;padding:10px 14px;color:#fff;font-family:'DM Sans',sans-serif;font-size:.9rem;transition:border-color .2s;outline:none;}
.fg input:focus,.fg textarea:focus{border-color:#29abe3;}
.fg textarea{resize:vertical;min-height:68px;}
.sp3{grid-column:span 3;}
.btn-create{margin-top:16px;padding:11px 28px;background:#29abe3;color:#1a1a1a;border:none;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:.9rem;cursor:pointer;transition:all .2s;}
.btn-create:hover{background:#3fbef0;transform:translateY(-1px);}
.btn-create:disabled{opacity:.5;cursor:not-allowed;transform:none;}
.orders-list{display:flex;flex-direction:column;gap:12px;}
.ocard{background:#222;border:1px solid #383838;border-radius:12px;padding:18px 22px;display:block;transition:border-color .2s;border-left:3px solid #383838;}.oacts{display:flex;flex-direction:row;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid #383838;}
.ocard:hover{border-left-color:#29abe3;border-color:#29abe3;}
.ocard.delivered{border-left-color:#3ab87a;}
.oh{display:flex;align-items:center;gap:10px;margin-bottom:5px;}
.oid{font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:700;color:#29abe3;}
.oname{font-weight:500;}
.ometa{color:#888;font-size:.8rem;margin-bottom:12px;}
.srow{display:flex;align-items:center;gap:3px;flex-wrap:wrap;}
.sc{padding:4px 11px;border-radius:20px;font-size:.72rem;font-weight:600;border:none;cursor:default;white-space:nowrap;transition:all .18s;}
.sdone{background:#1e3d2a;color:#3ab87a;}
.scurr{background:#29abe3;color:#1a1a1a;}
.snext{background:#383838;color:#888;cursor:pointer;}
.snext:hover{background:#444;color:#fff;}
.sarr{color:#444;font-size:.65rem;}
.hint{font-size:.73rem;color:#888;margin-top:6px;}
.oacts{display:flex;gap:8px;align-items:flex-start;padding-top:2px;}
.blnk{padding:7px 14px;background:#383838;color:#fff;border:none;border-radius:8px;font-size:.8rem;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;transition:all .2s;white-space:nowrap;}
.blnk:hover{background:#e32285;}
.bdel{padding:7px 10px;background:transparent;color:#888;border:1px solid #383838;border-radius:8px;font-size:.85rem;cursor:pointer;transition:all .2s;}
.bdel:hover{background:#4a1a1a;color:#ff6b6b;border-color:#4a1a1a;}
.bdone-badge{display:inline-block;padding:3px 10px;background:#1e3d2a;color:#3ab87a;border-radius:20px;font-size:.7rem;font-weight:700;}
.photo-section{margin-top:14px;padding-top:14px;border-top:1px dashed #383838;}
.photo-section-title{font-size:.72rem;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;}
.photo-stages{display:flex;flex-wrap:wrap;gap:10px;}
.photo-slot{display:flex;flex-direction:column;align-items:center;gap:6px;}
.photo-slot-label{font-size:.68rem;color:#888;text-align:center;max-width:80px;line-height:1.3;}
.photo-thumb{width:72px;height:72px;border-radius:8px;object-fit:cover;border:2px solid #29abe3;cursor:pointer;transition:opacity .2s;}
.photo-thumb:hover{opacity:.8;}
.photo-upload-btn{width:72px;height:72px;border-radius:8px;border:2px dashed #383838;background:#1a1a1a;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;gap:4px;}
.photo-upload-btn:hover{border-color:#29abe3;background:#1e2a30;}
.photo-upload-btn span{font-size:1.2rem;}
.photo-upload-btn small{font-size:.6rem;color:#888;text-align:center;line-height:1.2;}
.photo-remove{font-size:.65rem;color:#e32285;cursor:pointer;background:none;border:none;padding:0;font-family:'DM Sans',sans-serif;}
.photo-remove:hover{text-decoration:underline;}
.lightbox-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fdin .2s ease;}
@keyframes fdin{from{opacity:0}to{opacity:1}}
.lightbox-img{max-width:90vw;max-height:85vh;border-radius:10px;box-shadow:0 0 60px rgba(0,0,0,.8);}
.lightbox-close{position:absolute;top:20px;right:24px;font-size:2rem;color:#fff;cursor:pointer;background:none;border:none;line-height:1;opacity:.7;transition:opacity .2s;}
.lightbox-close:hover{opacity:1;}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#3ab87a;color:#fff;padding:10px 24px;border-radius:30px;font-size:.88rem;font-weight:600;pointer-events:none;animation:fuv .3s ease;z-index:999;white-space:nowrap;}
.toast.err{background:#c0392b;}
@keyframes fuv{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
.empty{text-align:center;padding:60px 0;color:#888;}
.empty-ico{font-size:2.5rem;margin-bottom:12px;}
.loading{text-align:center;padding:60px 0;color:#888;font-size:.9rem;}
.loading-spin{font-size:2rem;animation:spin 1s linear infinite;display:block;margin-bottom:12px;}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.track-page{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;background:radial-gradient(ellipse at 50% -10%,#1a2a35 0%,#2b2b2b 60%);}
.cmyk{display:flex;gap:6px;margin-top:10px;justify-content:center;}
.cmykd{width:8px;height:8px;border-radius:1px;}
.track-tag{text-align:center;color:#888;font-size:.78rem;letter-spacing:2px;text-transform:uppercase;margin-top:6px;}
.tsbar{width:100%;max-width:540px;display:flex;gap:10px;margin:32px 0 20px;}
.tsbar input{flex:1;background:#222;border:1px solid #383838;border-radius:10px;padding:13px 18px;color:#fff;font-family:'DM Sans',sans-serif;font-size:.95rem;outline:none;transition:border-color .2s;}
.tsbar input:focus{border-color:#29abe3;}
.tsbar button{padding:13px 22px;background:#29abe3;color:#1a1a1a;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-weight:700;cursor:pointer;transition:background .2s;}
.tsbar button:hover{background:#3fbef0;}
.tcard{width:100%;max-width:540px;background:#222;border:1px solid #383838;border-radius:20px;padding:36px 38px;border-top:3px solid #29abe3;}
.tclbl{font-size:.7rem;text-transform:uppercase;letter-spacing:1.5px;color:#888;}
.tcid{font-family:'Space Grotesk',sans-serif;font-size:1.9rem;font-weight:700;color:#29abe3;margin:4px 0 2px;}
.tccli{color:#888;font-size:.88rem;margin-bottom:28px;line-height:1.6;}
.tccli strong{color:#fff;}
.timeline{display:flex;flex-direction:column;}
.tli{display:flex;gap:14px;position:relative;}
.tlconn{position:absolute;left:17px;top:34px;width:2px;height:calc(100% - 6px);background:#383838;z-index:0;}
.tli.tldone .tlconn{background:#29abe3;}
.tldotc{display:flex;flex-direction:column;align-items:center;z-index:1;}
.tldot{width:34px;height:34px;border-radius:50%;border:2px solid #383838;display:flex;align-items:center;justify-content:center;font-size:.9rem;background:#1a1a1a;flex-shrink:0;transition:all .3s;}
.tli.tldone .tldot{border-color:#29abe3;background:#29abe3;}
.tli.tlcurr .tldot{border-color:#e32285;background:#1a1a1a;box-shadow:0 0 0 4px rgba(227,34,133,.18);}
.tlbody{padding:6px 0 22px;flex:1;}
.tlst{font-weight:600;font-size:.9rem;color:#888;}
.tli.tldone .tlst{color:#fff;}
.tli.tlcurr .tlst{color:#e32285;}
.tlbadge{display:inline-block;margin-left:8px;padding:1px 9px;background:rgba(227,34,133,.15);color:#e32285;border-radius:20px;font-size:.67rem;font-weight:700;letter-spacing:.5px;vertical-align:middle;}
.tldt{font-size:.75rem;color:#888;margin-top:2px;}
.tl-photo-wrap{margin-top:10px;}
.tl-photo{width:100%;max-width:340px;border-radius:10px;object-fit:cover;border:2px solid #29abe3;cursor:pointer;transition:transform .2s,box-shadow .2s;display:block;}
.tl-photo:hover{transform:scale(1.02);box-shadow:0 4px 20px rgba(41,171,227,.3);}
.tl-photo-caption{font-size:.72rem;color:#888;margin-top:5px;display:flex;align-items:center;gap:5px;}
.tcnotes{margin-top:22px;padding-top:18px;border-top:1px solid #383838;color:#888;font-size:.85rem;line-height:1.6;}
.tcnotes strong{color:#fff;}
.tnf{width:100%;max-width:540px;background:#222;border:1px solid #383838;border-radius:16px;padding:32px;text-align:center;color:#888;}

/* -- MOBILE -- */
@media(max-width:640px){
  .topbar{padding:12px 14px;}
  .tab-btn{padding:7px 10px;font-size:.75rem;}
  .admin{padding:20px 14px;}
  .page-title{font-size:1.3rem;}
  .page-sub{font-size:.82rem;}
  .order-form{padding:18px 14px;}
  .form-grid{grid-template-columns:1fr;}
  .sp3{grid-column:span 1;}
  .orders-list{gap:10px;}
  .ocard{grid-template-columns:1fr;padding:14px;gap:0;}
  .oh{flex-wrap:wrap;gap:6px;margin-bottom:4px;}
  .ometa{font-size:.75rem;margin-bottom:10px;}
  .srow{overflow-x:auto;flex-wrap:nowrap;padding-bottom:8px;-webkit-overflow-scrolling:touch;}
  .srow::-webkit-scrollbar{height:3px;}
  .srow::-webkit-scrollbar-thumb{background:#444;border-radius:2px;}
  .sc{font-size:.68rem;padding:4px 9px;flex-shrink:0;}
  .sarr{flex-shrink:0;}
  .photo-section{margin-top:12px;padding-top:12px;}
  .photo-stages{gap:10px;flex-wrap:wrap;}
  .photo-thumb,.photo-upload-btn{width:68px;height:68px;}
  .photo-slot-label{font-size:.65rem;max-width:68px;}
  .oacts{display:flex;flex-direction:row;gap:8px;margin-top:14px;padding-top:14px;border-top:1px solid #383838;}
  .blnk{flex:1;text-align:center;padding:10px 8px;font-size:.82rem;}
  .bdel{padding:10px 14px;font-size:.9rem;}
  .tcard{padding:24px 18px;}
  .tcid{font-size:1.5rem;}
  .tsbar{flex-direction:column;}
  .tsbar button{width:100%;padding:13px;}
  .tl-photo{max-width:100%;}
}
`;

const STAGES = [
  {key:"received", label:"Pedido recebido",         icon:"📋"},
  {key:"queued",   label:"Na fila de impressão",     icon:"🕐"},
  {key:"printing", label:"Em impressão",             icon:"🖨️"},
  {key:"painting", label:"Em pintura / acabamento",  icon:"🎨"},
  {key:"ready",    label:"Pronto para envio",        icon:"📦"},
  {key:"delivered",label:"Enviado / Entregue",       icon:"✅"},
];

const sIdx = k => STAGES.findIndex(s => s.key === k);
const genId = () => "CI-" + Math.random().toString(36).slice(2,6).toUpperCase();
const fmt = ts => ts ? new Date(ts).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}) : "";

function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>x</button>
      <img className="lightbox-img" src={src} alt="Foto do pedido" onClick={e=>e.stopPropagation()} />
    </div>
  );
}

// --- ADMIN ------------------------------------------------------------
function Admin({ orders, setOrders }) {
  const [f, setF] = useState({client:"",phone:"",item:"",qty:"1",notes:""});
  const [toast, setToast] = useState("");
  const [toastErr, setToastErr] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const fileRefs = useRef({});

  const toast_ = (m, err=false) => { setToast(m); setToastErr(err); setTimeout(()=>setToast(""),2600); };

  async function create() {
    if (!f.client.trim() || !f.item.trim()) return;
    setSaving(true);
    try {
      const customId = genId();
      const o = {
        id: customId, client: f.client.trim(), phone: f.phone.trim(),
        item: f.item.trim(), qty: f.qty||"1", notes: f.notes.trim(),
        stage: "received",
        history: [{stage:"received", ts: Date.now()}],
        photos: {},
      };
      await db.insert(o);
      // Busca o pedido recém criado pelo id customizado
      const saved = await db.getById(customId);
      setOrders(prev => [saved || o, ...prev]);
      setF({client:"",phone:"",item:"",qty:"1",notes:""});
      toast_("Pedido " + o.id + " criado e salvo! ✅");
    } catch(e) {
      toast_("Erro ao salvar. Verifique a conexão.", true);
    }
    setSaving(false);
  }

  async function advance(id) {
    const o = orders.find(x => x.id === id);
    if (!o) return;
    const i = sIdx(o.stage);
    if (i >= STAGES.length - 1) return;
    const ns = STAGES[i+1].key;
    const newHistory = [...(o.history||[]), {stage:ns, ts:Date.now()}];
    const updated = {...o, stage:ns, history:newHistory};
    setOrders(prev => prev.map(x => x.id===id ? updated : x));
    await db.update(id, {stage:ns, history:newHistory});
  }

  async function remove(id) {
    setOrders(prev => prev.filter(x => x.id !== id));
    await db.delete(id);
    toast_("Pedido removido.");
  }

  function copyLink(id) {
    navigator.clipboard.writeText(window.location.href.split("?")[0] + "?track=" + id).catch(()=>{});
    toast_("Link copiado! 🔗 Envie no WhatsApp");
  }

  function handlePhotoUpload(orderId, stageKey, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async e => {
      const o = orders.find(x => x.id === orderId);
      if (!o) return;
      const newPhotos = {...(o.photos||{}), [stageKey]: {src: e.target.result, ts: Date.now()}};
      const updated = {...o, photos: newPhotos};
      setOrders(prev => prev.map(x => x.id===orderId ? updated : x));
      await db.update(orderId, {photos: newPhotos});
      toast_("Foto salva! 📸");
    };
    reader.readAsDataURL(file);
  }

  async function removePhoto(orderId, stageKey) {
    const o = orders.find(x => x.id === orderId);
    if (!o) return;
    const newPhotos = {...(o.photos||{})};
    delete newPhotos[stageKey];
    const updated = {...o, photos: newPhotos};
    setOrders(prev => prev.map(x => x.id===orderId ? updated : x));
    await db.update(orderId, {photos: newPhotos});
  }

  const reachedStages = o => STAGES.filter((_,i) => i <= sIdx(o.stage));

  return (
    <div className="admin">
      <h1 className="page-title">Painel de Pedidos</h1>
      <p className="page-sub">Crie pedidos, avance o status, adicione fotos por etapa e copie o link para o cliente.</p>

      <div className="order-form">
        <div className="form-ttl">+ Novo Pedido</div>
        <div className="form-grid">
          <div className="fg"><label>Nome do cliente</label><input placeholder="Ex: Ana Lima" value={f.client} onChange={e=>setF({...f,client:e.target.value})}/></div>
          <div className="fg"><label>WhatsApp</label><input placeholder="(11) 99999-9999" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/></div>
          <div className="fg"><label>Quantidade</label><input type="number" min="1" value={f.qty} onChange={e=>setF({...f,qty:e.target.value})}/></div>
          <div className="fg sp3"><label>Descrição do item</label><input placeholder="Ex: Miniatura dragão 15cm — resina cinza, asas verdes" value={f.item} onChange={e=>setF({...f,item:e.target.value})}/></div>
          <div className="fg sp3"><label>Observações</label><textarea placeholder="Detalhes extras, cores, prazo, etc." value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/></div>
        </div>
        <button className="btn-create" onClick={create} disabled={saving}>
          {saving ? "Salvando..." : "Criar Pedido"}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty"><div className="empty-ico">📭</div><div>Nenhum pedido ainda. Crie o primeiro acima!</div></div>
      ) : (
        <div className="orders-list">
          {orders.map(o => {
            const idx = sIdx(o.stage);
            return (
              <div className={`ocard${o.stage==="delivered"?" delivered":""}`} key={o.id} style={{display:"block"}}>
                <div>
                  <div className="oh">
                    <span className="oid">{o.id}</span>
                    <span className="oname">{o.client}</span>
                    {o.stage==="delivered" && <span className="bdone-badge">v Entregue</span>}
                  </div>
                  <div className="ometa">{o.qty}× {o.item}{o.phone ? ` - ${o.phone}` : ""}</div>
                  <div className="srow">
                    {STAGES.map((s,i) => {
                      let c = "sc ";
                      if (i < idx) c += "sdone";
                      else if (i === idx) c += "scurr";
                      else c += "snext";
                      return (
                        <span key={s.key} style={{display:"inline-flex",alignItems:"center"}}>
                          <span className={c} onClick={()=>{if(i===idx+1)advance(o.id);}} title={i===idx+1?"Avançar para esta etapa":""}>
                            {s.icon} {s.label}
                          </span>
                          {i < STAGES.length-1 && <span className="sarr"> > </span>}
                        </span>
                      );
                    })}
                  </div>
                  {o.stage !== "delivered" && <div className="hint">Clique na próxima etapa para avançar o pedido</div>}

                  <div className="photo-section">
                    <div className="photo-section-title">📸 Fotos por etapa — visíveis para o cliente</div>
                    <div className="photo-stages">
                      {reachedStages(o).map(s => {
                        const photo = (o.photos||{})[s.key];
                        const refKey = o.id + "_" + s.key;
                        return (
                          <div className="photo-slot" key={s.key}>
                            {photo ? (
                              <>
                                <img className="photo-thumb" src={photo.src} alt={s.label} onClick={()=>setLightbox(photo.src)} title="Clique para ampliar"/>
                                <button className="photo-remove" onClick={()=>removePhoto(o.id,s.key)}>x remover</button>
                              </>
                            ) : (
                              <>
                                <div className="photo-upload-btn" onClick={()=>fileRefs.current[refKey]?.click()}>
                                  <span>📷</span><small>Adicionar<br/>foto</small>
                                </div>
                                <input type="file" accept="image/*" style={{display:"none"}} ref={el=>fileRefs.current[refKey]=el} onChange={e=>handlePhotoUpload(o.id,s.key,e.target.files[0])}/>
                              </>
                            )}
                            <div className="photo-slot-label">{s.icon} {s.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="oacts">
                    <button className="blnk" onClick={()=>copyLink(o.id)}>🔗 Link do cliente</button>
                    <button className="bdel" onClick={()=>remove(o.id)}>Excluir</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {toast && <div className={"toast" + (toastErr ? " err" : "")}>{toast}</div>}
      <Lightbox src={lightbox} onClose={()=>setLightbox(null)}/>
    </div>
  );
}

// --- TRACKING ---------------------------------------------------------
function Tracking({ initId }) {
  const [inp, setInp] = useState(initId||"");
  const [aid, setAid] = useState(initId||"");
  const [order, setOrder] = useState(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!aid) return;
    setSearching(true); setNotFound(false); setOrder(null);
    db.getById(aid.toUpperCase()).then(o => {
      setOrder(o||null);
      setNotFound(!o);
      setSearching(false);
    });
  }, [aid]);

  return (
    <div className="track-page">
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <LogoSVG height={50}/>
        <div className="cmyk">
          <div className="cmykd" style={{background:"#29abe3"}}/>
          <div className="cmykd" style={{background:"#e32285"}}/>
          <div className="cmykd" style={{background:"#faea27"}}/>
        </div>
        <div className="track-tag">Acompanhe seu pedido</div>
      </div>

      <div className="tsbar">
        <input placeholder="Digite seu código (ex: CI-AB12)" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setAid(inp.trim())}/>
        <button onClick={()=>setAid(inp.trim())}>Rastrear</button>
      </div>

      {searching && (
        <div className="loading"><span className="loading-spin">⏳</span>Buscando pedido...</div>
      )}

      {notFound && !searching && (
        <div className="tnf">
          <div style={{fontSize:"2rem",marginBottom:8}}>🔍</div>
          Pedido <strong style={{color:"#fff"}}>{aid.toUpperCase()}</strong> não encontrado.<br/>
          <span style={{fontSize:".82rem"}}>Verifique o código e tente novamente.</span>
        </div>
      )}

      {order && !searching && (
        <div className="tcard">
          <div className="tclbl">Código do pedido</div>
          <div className="tcid">{order.id}</div>
          <div className="tccli">{order.qty}× {order.item}<br/>Cliente: <strong>{order.client}</strong></div>
          <div className="timeline">
            {STAGES.map((s,i) => {
              const idx = sIdx(order.stage);
              const h = (order.history||[]).find(x=>x.stage===s.key);
              const photo = (order.photos||{})[s.key];
              let c = "tli ";
              if (i < idx) c += "tldone";
              else if (i === idx) c += "tlcurr";
              return (
                <div className={c} key={s.key}>
                  {i < STAGES.length-1 && <div className="tlconn"/>}
                  <div className="tldotc"><div className="tldot">{i<=idx ? s.icon : "o"}</div></div>
                  <div className="tlbody">
                    <div className="tlst">{s.label}{i===idx&&<span className="tlbadge">AGORA</span>}</div>
                    {h && <div className="tldt">{fmt(h.ts)}</div>}
                    {photo && i<=idx && (
                      <div className="tl-photo-wrap">
                        <img className="tl-photo" src={photo.src} alt={`Foto - ${s.label}`} onClick={()=>setLightbox(photo.src)}/>
                        <div className="tl-photo-caption"><span>🔍</span> Clique para ampliar</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {order.notes && <div className="tcnotes"><strong>Observações:</strong> {order.notes}</div>}
        </div>
      )}
      <Lightbox src={lightbox} onClose={()=>setLightbox(null)}/>
    </div>
  );
}

// --- SENHA ADMIN ------------------------------------------------------
const ADMIN_PASSWORD = "CR4FT1NKTRAKER";

function LoginScreen({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);

  function tryLogin() {
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("ci_auth", "1");
      onLogin();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  }

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",background:"radial-gradient(ellipse at 50% -10%,#1a2a35 0%,#2b2b2b 60%)"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:40}}>
        <LogoSVG height={48}/>
        <div style={{display:"flex",gap:6,marginTop:10,justifyContent:"center"}}>
          <div style={{width:8,height:8,borderRadius:1,background:"#29abe3"}}/>
          <div style={{width:8,height:8,borderRadius:1,background:"#e32285"}}/>
          <div style={{width:8,height:8,borderRadius:1,background:"#faea27"}}/>
        </div>
        <div style={{textAlign:"center",color:"#888",fontSize:".78rem",letterSpacing:2,textTransform:"uppercase",marginTop:6}}>Área administrativa</div>
      </div>

      <div style={{width:"100%",maxWidth:380,background:"#222",border:"1px solid #383838",borderRadius:16,padding:"32px 36px",borderTop:"3px solid #29abe3"}}>
        <div style={{fontSize:".75rem",fontWeight:700,color:"#29abe3",textTransform:"uppercase",letterSpacing:1.5,marginBottom:20}}>🔒 Acesso restrito</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
          <label style={{fontSize:".72rem",color:"#888",textTransform:"uppercase",letterSpacing:.8}}>Senha</label>
          <input
            type="password"
            placeholder="Digite a senha"
            value={pwd}
            onChange={e=>{setPwd(e.target.value);setErr(false);}}
            onKeyDown={e=>e.key==="Enter"&&tryLogin()}
            style={{background:"#1a1a1a",border:`1px solid ${err?"#e32285":"#383838"}`,borderRadius:8,padding:"11px 14px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:".9rem",outline:"none",transition:"border-color .2s"}}
          />
          {err && <div style={{fontSize:".78rem",color:"#e32285",marginTop:2}}>Senha incorreta. Tente novamente.</div>}
        </div>
        <button
          onClick={tryLogin}
          style={{width:"100%",padding:"11px 0",background:"#29abe3",color:"#1a1a1a",border:"none",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:".9rem",cursor:"pointer",transition:"background .2s"}}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

// --- ROOT -------------------------------------------------------------
export default function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("ci_auth") === "1");
  const params = new URLSearchParams(typeof window!=="undefined" ? window.location.search : "");
  const tid = params.get("track")||"";
  // Se vier com ?track=, vai direto para rastreamento sem pedir senha
  const [tab, setTab] = useState(tid ? "track" : "admin");

  useEffect(() => {
    if (tab === "admin" && authed) {
      setLoading(true);
      db.getAll().then(data => { setOrders(data||[]); setLoading(false); });
    }
  }, [tab, authed]);

  return (
    <>
      <style>{CSS}</style>
      <div className="accent-stripe"/>

      {/* Aba de rastreamento — sempre pública, sem senha */}
      {tab === "track" ? (
        <>
          <div className="topbar">
            <LogoSVG height={30}/>
            <div className="nav-tabs">
              <button className="tab-btn am">📦 Rastrear Pedido</button>
            </div>
          </div>
          <Tracking initId={tid}/>
        </>
      ) : (
        /* Aba admin — exige senha */
        !authed ? (
          <LoginScreen onLogin={()=>setAuthed(true)}/>
        ) : (
          <>
            <div className="topbar">
              <LogoSVG height={30}/>
              <div className="nav-tabs">
                <button className={`tab-btn${tab==="admin"?" ac":""}`} onClick={()=>setTab("admin")}>⚙️ Admin</button>
                <button className={`tab-btn${tab==="track"?" am":""}`} onClick={()=>setTab("track")}>📦 Rastrear Pedido</button>
                <button className="tab-btn" style={{color:"#888"}} onClick={()=>{sessionStorage.removeItem("ci_auth");setAuthed(false);}}>Sair</button>
              </div>
            </div>
            {loading ? (
              <div className="loading" style={{paddingTop:80}}>
                <span className="loading-spin">⏳</span>Carregando pedidos...
              </div>
            ) : (
              <Admin orders={orders} setOrders={setOrders}/>
            )}
          </>
        )
      )}
    </>
  );
}
