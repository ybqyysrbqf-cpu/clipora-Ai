const $ = (id) => document.getElementById(id);
const views = {home:$("homeView"),editor:$("editorView"),library:$("libraryView")};
let currentFile = null, currentUrl = null, duration = 0, selectedFormat = "original";
let projects = [];
try { projects = JSON.parse(localStorage.getItem("clipora_projects") || "[]"); } catch {}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2800);}
function showView(name){Object.entries(views).forEach(([key,el])=>el.classList.toggle("active-view",key===name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===name));$("crumbName").textContent=name==="home"?"Overview":name==="editor"?"Clip editor":"My projects";$("sidebar").classList.remove("open");if(name==="library")renderProjects();window.scrollTo({top:0,behavior:"smooth"});}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.open)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
$("helpBtn").addEventListener("click",()=>$("helpModal").classList.add("open"));
$("closeHelp").addEventListener("click",()=>$("helpModal").classList.remove("open"));
$("gotIt").addEventListener("click",()=>$("helpModal").classList.remove("open"));
["uploadCta","quickUpload","editorUpload","emptyUpload","libraryUpload","libraryEmptyUpload"].forEach(id=>$(id).addEventListener("click",()=>$("fileInput").click()));
$("fileInput").addEventListener("change",e=>{
 const file=e.target.files?.[0]; if(!file)return;
 if(!file.type.startsWith("video/")){toast("Please choose a video file.");return;}
 if(file.size>500*1024*1024){toast("This preview recommends videos under 500 MB.");}
 if(currentUrl)URL.revokeObjectURL(currentUrl);
 currentFile=file;currentUrl=URL.createObjectURL(file);
 const video=$("video");video.src=currentUrl;$("videoStage").classList.add("has-video");
 $("videoName").textContent=file.name;$("videoInfo").textContent=`${(file.size/1024/1024).toFixed(1)} MB · Stored locally in this browser`;
 $("previewState").textContent="Video loaded";$("saveClip").disabled=false;
 $("clipTitle").value=file.name.replace(/\.[^.]+$/,"").slice(0,60);
 showView("editor");toast("Video loaded. Set your clip start and end times.");
});
$("video").addEventListener("loadedmetadata",()=>{
 duration=$("video").duration||0;
 $("startTime").value="0";$("endTime").value=Math.min(15,duration).toFixed(1);
 $("videoInfo").textContent=`${formatTime(duration)} · ${(currentFile.size/1024/1024).toFixed(1)} MB · Local preview`;
});
$("video").addEventListener("timeupdate",()=>{});
function formatTime(s){if(!Number.isFinite(s))return "Unknown duration";const m=Math.floor(s/60),sec=Math.floor(s%60);return `${m}:${String(sec).padStart(2,"0")}`;}
document.querySelectorAll(".format-option").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".format-option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selectedFormat=b.dataset.format;}));
$("saveClip").addEventListener("click",()=>{
 if(!currentFile){toast("Choose a video first.");return;}
 const start=Number($("startTime").value),end=Number($("endTime").value);
 if(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<=start||end>duration+0.05){toast(`Choose a valid range between 0 and ${duration.toFixed(1)} seconds.`);return;}
 const project={id:Date.now(),title:$("clipTitle").value.trim()||"Untitled clip",fileName:currentFile.name,fileSize:currentFile.size,duration,start,end,format:selectedFormat,created:new Date().toLocaleString()};
 projects.unshift(project);projects=projects.slice(0,30);
 try{localStorage.setItem("clipora_projects",JSON.stringify(projects));}catch{toast("Browser storage is full. Project settings could not be saved.");return;}
 toast("Clip settings saved in My projects.");showView("library");
});
$("backHome").addEventListener("click",()=>showView("home"));
function renderProjects(){
 const list=$("projectList");
 if(!projects.length){list.innerHTML='<div class="empty-library"><div class="empty-library-icon">▤</div><b>No projects yet</b><p>Upload your first video to start a project.</p><button class="primary-btn" id="libraryEmptyUpload2">Upload a video →</button></div>';$("libraryEmptyUpload2").addEventListener("click",()=>$("fileInput").click());return;}
 list.innerHTML=projects.map(p=>`<div class="project-row"><div class="project-thumb">▶</div><div class="project-info"><b>${escapeHtml(p.title)}</b><small>${escapeHtml(p.fileName)} · ${formatTime(p.end-p.start)} clip · ${escapeHtml(p.created)}</small></div><button class="project-open" data-project="${p.id}">Details</button></div>`).join("");
 list.querySelectorAll("[data-project]").forEach(btn=>btn.addEventListener("click",()=>{const p=projects.find(x=>x.id===Number(btn.dataset.project));if(p)toast(`${p.title}: ${p.start}s–${p.end}s · ${p.format==="vertical"?"9:16":"Original"} format`);}));
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
renderProjects();
