#!/usr/bin/env python3
"""
TeamBud Application Builder:
Extends teambud-app.html and teambud-home.html with:
  Section 6: Agency Creation and Team Management
  Section 7: Public Agency Profile
  Section 8: Team Dashboard
  Section 9: TeamBud Marketplace for Clients
"""

import os
import re
import json

def main():
    print("Reading original teambud-app.html...")
    with open('public/assets/aistudio/teambud-app_7ed5b051.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Inject extra CSS before </style>
    style_marker = '</style>'
    style_pos = html.find(style_marker)
    if style_pos == -1:
        raise ValueError("Could not find </style> in teambud-app.html")

    extra_css = """
/* ===================== Sections 6, 7, 8, 9 Styles ===================== */
.modal-backdrop{position:fixed;inset:0;background:rgba(15,85,64,0.45);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;animation:tbFadeIn .18s ease-out}
.modal-dialog{background:var(--white);border-radius:18px;border:1px solid var(--line);max-width:760px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 24px 50px rgba(24,68,55,0.2);padding:28px;position:relative}
.modal-close{position:absolute;top:18px;right:18px;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--muted);width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px}
.modal-close:hover{background:var(--sage);color:var(--forest)}
@keyframes tbFadeIn{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}

.badge{display:inline-flex;align-items:center;gap:6px;font-size:.76rem;font-weight:700;padding:3px 10px;border-radius:999px;letter-spacing:.02em;text-transform:uppercase}
.badge.active{background:#E8F5E9;color:#1B5E20;border:1px solid #A5D6A7}
.badge.forming{background:#FFF9C4;color:#E65100;border:1px solid #FFE082}
.badge.needs-members{background:#FFEBEE;color:#C62828;border:1px solid #EF9A9A}
.badge.role{background:var(--sage);color:var(--forest);border:1px solid var(--line);text-transform:none;font-weight:600}

.rule-tracker{background:var(--sage);padding:18px 22px;border-radius:14px;border:1px solid var(--line);margin-bottom:22px}
.rule-tracker .rule-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-family:var(--head);font-weight:700}
.rule-tracker .meter-bar{height:10px;background:rgba(23,107,80,0.15);border-radius:999px;overflow:hidden;margin:8px 0}
.rule-tracker .meter-bar i{display:block;height:100%;background:var(--emerald);border-radius:999px;transition:width .3s}
.rule-tracker .meter-bar.active i{background:var(--bud)}
.rule-tracker .meter-bar.needs i{background:var(--danger)}

.subnav{display:flex;gap:6px;border-bottom:2px solid var(--line);margin-bottom:24px;overflow-x:auto;padding-bottom:2px}
.subnav a,.subnav button{padding:10px 16px;border:none;background:none;font-family:var(--head);font-weight:600;font-size:.9rem;color:var(--muted);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-4px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;border-radius:6px 6px 0 0}
.subnav a:hover,.subnav button:hover{color:var(--forest);background:rgba(229,237,226,0.5)}
.subnav a.on,.subnav button.on{color:var(--emerald);border-bottom-color:var(--emerald);font-weight:800;background:none}

.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:16px}
.proj-card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 6px rgba(0,0,0,0.02)}
.proj-status{font-size:.76rem;font-weight:700;padding:3px 10px;border-radius:999px;text-transform:uppercase}
.proj-status.New{background:#E3F2FD;color:#1565C0}
.proj-status.Planning{background:#FFF3E0;color:#E65100}
.proj-status.InProgress{background:#E8F5E9;color:#2E7D32}
.proj-status.UnderReview{background:#EDE7F6;color:#512DA8}
.proj-status.Completed{background:#E0F2F1;color:#00695C}
.proj-status.Cancelled{background:#FFEBEE;color:#C62828}

.chat-panel{display:flex;flex-direction:column;height:520px;border:1px solid var(--line);border-radius:14px;background:var(--white);overflow:hidden}
.chat-head{padding:14px 20px;border-bottom:1px solid var(--line);background:var(--ivory);display:flex;justify-content:space-between;align-items:center}
.chat-stream{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px}
.chat-msg{display:flex;gap:12px;max-width:82%}
.chat-msg.mine{align-self:flex-end;flex-direction:row-reverse}
.chat-bubble{background:var(--ivory);padding:12px 16px;border-radius:14px;border:1px solid var(--line);font-size:.92rem}
.chat-msg.mine .chat-bubble{background:var(--sage);border-color:#BDD4C7}
.chat-footer{display:flex;gap:10px;padding:14px;border-top:1px solid var(--line);background:var(--white);align-items:center}

.quote-card{border:2px solid var(--emerald);background:#FAFCF9;border-radius:14px;padding:22px;margin-top:16px}
.quote-price{font-size:1.75rem;font-family:var(--head);font-weight:800;color:var(--emerald)}
.milestone-table{width:100%;border-collapse:collapse;margin:12px 0}
.milestone-table th,.milestone-table td{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;font-size:.9rem}

.pub-hero{background:linear-gradient(135deg,#0F5540 0%,#176B50 100%);color:#fff;border-radius:20px;padding:44px 32px;margin-bottom:32px;box-shadow:0 12px 30px rgba(15,85,64,0.18)}
.pub-hero h1{color:#fff;font-size:2.2rem;margin-bottom:10px}
.pub-hero p{color:#E5EDE2;font-size:1.1rem;max-width:760px}
.pub-logo{width:84px;height:84px;border-radius:18px;background:#fff;border:3px solid var(--lime);display:flex;align-items:center;justify-content:center;font-family:var(--head);font-weight:800;font-size:2rem;color:var(--emerald);margin-bottom:18px;overflow:hidden}
.pub-logo img{width:100%;height:100%;object-fit:cover}

.service-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin:20px 0}
.service-item{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:22px;display:flex;flex-direction:column;justify-content:space-between}
.service-price{font-size:1.25rem;font-weight:800;color:var(--emerald);margin-top:12px}
.team-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin:20px 0}
.team-card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:18px;text-align:center;display:flex;flex-direction:column;align-items:center}
.portfolio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;margin:20px 0}
.portfolio-card{background:var(--white);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.portfolio-img{width:100%;height:190px;background:var(--sage);object-fit:cover;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--muted)}
"""

    html = html[:style_pos] + extra_css + html[style_pos:]

    # 2. Add modal container to body
    root_marker = '<div id="root"></div>'
    html = html.replace(root_marker, root_marker + '\n<div id="modal-container"></div>', 1)

    print("HTML headers & containers updated.")
    return html

if __name__ == '__main__':
    main()
EOF
