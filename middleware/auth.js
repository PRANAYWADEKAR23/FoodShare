const jwt = require('jsonwebtoken');
function requireAuth(req,res,next){const h=req.headers.authorization||'';const t=h.startsWith('Bearer ')?h.slice(7):null;if(!t)return res.status(401).json({error:'Authentication required'});try{req.user=jwt.verify(t,process.env.JWT_SECRET);next()}catch{return res.status(401).json({error:'Invalid or expired token'})}}
function requireAdmin(req,res,next){if(req.user?.role!=='admin')return res.status(403).json({error:'Admin access required'});next()}
module.exports={requireAuth,requireAdmin};
