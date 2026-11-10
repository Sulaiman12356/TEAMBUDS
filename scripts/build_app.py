#!/usr/bin/env python3
"""
build_app.py
Generates the complete TeamBud application with:
  Section 6: Agency Creation and Team Management
  Section 7: Public Agency Profile
  Section 8: Team Dashboard
  Section 9: TeamBud Marketplace for Clients
"""

import os
import re
import json

def get_base_html():
    with open('public/assets/aistudio/teambud-app_7ed5b051.html', 'r', encoding='utf-8') as f:
        html = f.read()
    return html

def get_extra_css():
    return """
/* ===================== Sections 6, 7, 8, 9 Styles ===================== */
.modal-backdrop{position:fixed;inset:0;background:rgba(15,85,64,0.48);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;animation:tbFadeIn .18s ease-out}
.modal-dialog{background:var(--white);border-radius:18px;border:1px solid var(--line);max-width:760px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 24px 50px rgba(24,68,55,0.22);padding:28px;position:relative}
.modal-close{position:absolute;top:18px;right:18px;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--muted);width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;line-height:1}
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
.step-prog{display:flex;gap:8px;margin:16px 0}
.step-dot{flex:1;height:6px;border-radius:999px;background:var(--line)}
.step-dot.done{background:var(--emerald)}
.agreement-box{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:24px;margin-bottom:20px}
.agreement-item{margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--line)}
.agreement-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.disclaimer-alert{background:#FFFDE7;border:1px solid #FFF59D;color:#795548;padding:16px;border-radius:12px;margin:18px 0;font-size:.92rem}

/* ===================== Sections 10 & 11: Payments & Opportunities ===================== */
.pay-badge{display:inline-flex;align-items:center;gap:6px;font-size:.76rem;font-weight:700;padding:3px 10px;border-radius:999px;letter-spacing:.02em;text-transform:uppercase}
.pay-badge.Paid{background:#E8F5E9;color:#1B5E20;border:1px solid #A5D6A7}
.pay-badge.AwaitingPayment{background:#FFF9C4;color:#E65100;border:1px solid #FFE082}
.pay-badge.Processing{background:#E1F5FE;color:#0277BD;border:1px solid #81D4FA}
.pay-badge.Failed{background:#FFEBEE;color:#C62828;border:1px solid #EF9A9A}
.pay-badge.Refunded{background:#EDE7F6;color:#4527A0;border:1px solid #B39DDB}
.pay-badge.Disputed{background:#FBE9E7;color:#D84315;border:1px solid #FFAB91}

.finance-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:20px 0}
.stat-box{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:20px;position:relative}
.stat-box .num{font-size:1.85rem;font-family:var(--head);font-weight:800;color:var(--forest);margin:6px 0 2px}
.stat-box .sub{font-size:.82rem;color:var(--muted)}
.stat-box.highlight{border-color:var(--emerald);background:rgba(23,107,80,0.02)}

.alloc-card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:18px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px}
.alloc-progress{background:rgba(23,107,80,0.12);height:10px;border-radius:999px;overflow:hidden;margin:12px 0;display:flex}
.alloc-progress-seg{height:100%;transition:width .3s}

.opp-filter-bar{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0;align-items:center}
.opp-chip{padding:6px 14px;border-radius:999px;border:1px solid var(--line);background:var(--white);font-size:.86rem;font-weight:600;color:var(--muted);cursor:pointer;transition:all .15s}
.opp-chip:hover{border-color:var(--emerald);color:var(--forest)}
.opp-chip.active{background:var(--emerald);color:#fff;border-color:var(--emerald)}

.opp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:20px;margin:20px 0}
.opp-card{background:var(--white);border:1px solid var(--line);border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .15s,box-shadow .15s;position:relative}
.opp-card:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(24,68,55,0.08);border-color:var(--forest)}
.opp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px}
.opp-org-badge{width:46px;height:46px;border-radius:12px;background:var(--sage);display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--emerald);font-size:1.2rem;flex-shrink:0}

.badge.verified{background:#E8F5E9;color:#1B5E20;border:1px solid #81C784}
.badge.community{background:#FFF8E1;color:#F57F17;border:1px solid #FFE082}

.paystack-modal{border:2px solid #09A5DB;border-radius:16px;background:var(--white);padding:28px}
.paystack-banner{background:linear-gradient(135deg,#011B33 0%,#09A5DB 100%);color:#fff;border-radius:12px;padding:18px 20px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center}

/* ===================== Talent Hub & Student Showcase ===================== */
.talent-hero{background:linear-gradient(145deg, #0F5540 0%, #176B50 70%, #1f7d5f 100%);color:#fff;border-radius:22px;padding:48px 36px;margin-bottom:32px;position:relative;overflow:hidden;box-shadow:0 16px 36px rgba(15,85,64,0.18)}
.talent-hero::after{content:'';position:absolute;right:-40px;top:-40px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle, rgba(197,232,108,0.18) 0%, transparent 70%);pointer-events:none}
.talent-hero h1{color:#fff;font-size:2.4rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:12px;max-width:700px}
.talent-hero p{color:#E5EDE2;font-size:1.08rem;line-height:1.6;max-width:680px;margin-bottom:24px}
.talent-hero-acts{display:flex;gap:14px;flex-wrap:wrap;align-items:center}
.talent-hero .btn-lime{background:var(--lime);color:var(--forest);font-weight:700;border:none;padding:12px 22px;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-family:var(--head);transition:all .15s}
.talent-hero .btn-lime:hover{background:#b5de54;transform:translateY(-1px)}
.talent-hero .btn-ghost-light{border:1px solid rgba(229,237,226,0.5);color:#fff;font-weight:600;padding:12px 20px;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .15s}
.talent-hero .btn-ghost-light:hover{background:rgba(255,255,255,0.12)}

.talent-cats{display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;margin-bottom:20px;scrollbar-width:thin}
.talent-cat-btn{padding:8px 16px;border-radius:999px;border:1px solid var(--line);background:var(--white);font-size:.85rem;font-weight:600;color:var(--forest);cursor:pointer;white-space:nowrap;transition:all .15s}
.talent-cat-btn:hover{border-color:var(--emerald);background:var(--ivory)}
.talent-cat-btn.active{background:var(--emerald);color:#fff;border-color:var(--emerald);box-shadow:0 2px 8px rgba(23,107,80,0.2)}

.talent-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;margin-top:20px}
.talent-card{background:var(--white);border:1px solid var(--line);border-radius:18px;padding:22px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 8px rgba(24,68,55,0.03);transition:transform .18s,box-shadow .18s,border-color .18s;position:relative}
.talent-card:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(24,68,55,0.08);border-color:#BDD4C7}
.talent-head{display:flex;gap:14px;align-items:flex-start;margin-bottom:12px}
.talent-avatar{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--lime);background:var(--sage);flex-shrink:0}
.talent-meta-unboxed{font-size:.84rem;color:var(--muted);margin-top:2px;line-height:1.4}
.talent-headline{font-size:.95rem;font-weight:700;color:var(--forest);margin:8px 0 10px;line-height:1.4}
.talent-skills{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}
.talent-skill-tag{font-size:.76rem;background:var(--sage);color:var(--forest);padding:3px 9px;border-radius:6px;font-weight:600}
.talent-card-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}

.talent-prof-header{background:var(--white);border:1px solid var(--line);border-radius:20px;padding:36px;margin-bottom:28px;box-shadow:0 4px 16px rgba(24,68,55,0.04);position:relative}
.talent-prof-top{display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}
.talent-prof-avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid var(--lime);box-shadow:0 6px 18px rgba(23,107,80,0.15);flex-shrink:0}
.talent-prof-actions{margin-left:auto;display:flex;gap:10px;flex-wrap:wrap}

.talent-sec{background:var(--white);border:1px solid var(--line);border-radius:18px;padding:28px;margin-bottom:24px}
.talent-sec-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;border-bottom:1px solid var(--line);padding-bottom:12px}
.talent-sec-h h2{font-size:1.35rem;font-weight:800;color:var(--forest);margin:0}

.talent-skill-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.talent-skill-card{border:1px solid var(--line);border-radius:14px;padding:16px;background:var(--ivory);transition:border-color .15s}
.talent-skill-card:hover{border-color:var(--emerald)}
.skill-bar-wrap{height:6px;background:rgba(23,107,80,0.12);border-radius:999px;margin:8px 0;overflow:hidden}
.skill-bar-fill{height:100%;border-radius:999px;background:var(--emerald)}

.talent-portfolio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
.talent-portfolio-item{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--white);display:flex;flex-direction:column;box-shadow:0 2px 8px rgba(0,0,0,0.02);transition:transform .18s,box-shadow .18s}
.talent-portfolio-item:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(24,68,55,0.08)}
.portfolio-img-box{width:100%;height:190px;background:var(--sage);object-fit:cover;display:flex;align-items:center;justify-content:center;position:relative}
.portfolio-img-box img{width:100%;height:100%;object-fit:cover}

.looking-tag{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;border:1px solid #BDD4C7;background:var(--sage);color:var(--forest);font-size:.86rem;font-weight:600;margin:4px}
.disclaimer-banner{background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;padding:14px 18px;color:#92400E;font-size:.88rem;margin:16px 0;display:flex;gap:12px;align-items:flex-start;line-height:1.5}

/* ===================== Onboarding & Dashboard Enhancements ===================== */
.onboarding-wrap{max-width:760px;margin:36px auto;padding:32px 28px;background:var(--white);border:1px solid var(--line);border-radius:20px;box-shadow:0 8px 30px rgba(24,68,55,0.06)}
.onboarding-stepper{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;position:relative}
.onboarding-stepper::before{content:'';position:absolute;top:18px;left:24px;right:24px;height:3px;background:var(--line);z-index:0}
.ob-step-node{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer}
.ob-step-circle{width:36px;height:36px;border-radius:50%;background:var(--white);border:2px solid var(--line);color:var(--muted);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.85rem;transition:all .2s}
.ob-step-node.active .ob-step-circle{border-color:var(--emerald);background:var(--emerald);color:#fff;box-shadow:0 0 0 4px rgba(23,107,80,0.18)}
.ob-step-node.completed .ob-step-circle{border-color:var(--lime);background:var(--lime);color:var(--forest)}
.ob-step-label{font-size:.75rem;font-weight:700;color:var(--muted);white-space:nowrap}
.ob-step-node.active .ob-step-label{color:var(--emerald);font-weight:800}

.rec-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin:16px 0}
.rec-card{background:var(--ivory);border:1px solid var(--line);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;transition:border-color .15s}
.rec-card:hover{border-color:var(--emerald)}

.member-talent-card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:16px;display:flex;gap:14px;align-items:flex-start}
.tab-strip{display:flex;gap:6px;border-bottom:2px solid var(--line);margin-bottom:20px;overflow-x:auto}
.tab-btn{background:none;border:none;padding:10px 16px;font-family:var(--head);font-size:.9rem;font-weight:600;color:var(--muted);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .15s}
.tab-btn:hover{color:var(--forest)}
.tab-btn.active{color:var(--emerald);border-bottom-color:var(--emerald);font-weight:800}
"""

print("Loaded get_extra_css")
