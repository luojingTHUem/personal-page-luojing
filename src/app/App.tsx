import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail, Phone, MapPin, ChevronRight, X, Minus, Send, ArrowLeft, Music, Trophy, Clapperboard, Users, Bot, Play, MessageCircle } from "lucide-react";
// 方法论知识库（4 份 md 原文，按需检索注入对话）
import coreMd from "@/knowledge/core.md?raw";
import devMd from "@/knowledge/dev.md?raw";
import aiMd from "@/knowledge/ai.md?raw";
import strategyMd from "@/knowledge/strategy.md?raw";
import bytedanceLogo from "@/imports/bytedance.png";
import tencentLogo from "@/imports/__.png";
import pinganLogo from "@/imports/__2.png";
import tsinghuaLogo from "@/imports/qinghua.png";
import csuLogo from "@/imports/____.png";
import szCityImg from "@/imports/__-1.png";
import fsCityImg from "@/imports/__-3.png";
import hzCityImg from "@/imports/__-2.png";
import bgDance from "@/imports/_______.png";
import bgMelon from "@/imports/________.png";
import bgDog from "@/imports/_________.png";
import bgZen from "@/imports/___________.png";
import bgMountain from "@/imports/_______-1.png";
import bgTarot from "@/imports/________-1.png";
import bgPink from "@/imports/bgPink.png";
import bgGreen from "@/imports/bgGreen.png";
import diaryCover from "@/imports/diaryCover.png";
import protoCover from "@/imports/protoCover.png";
import evalCover from "@/imports/evalCover.png";
import diaryHero from "@/imports/diaryHero.png";
import diaryFeatures from "@/imports/diaryFeatures.png";
import diaryInput from "@/imports/diaryInput.png";
import diaryOutput from "@/imports/diaryOutput.png";
import diaryOKR from "@/imports/diaryOKR.png";
import diaryInfra from "@/imports/diaryInfra.png";
import proto1 from "@/imports/proto1.png";
import proto2 from "@/imports/proto2.png";
import proto3 from "@/imports/proto3.png";
import eval1 from "@/imports/eval1.png";
import eval2 from "@/imports/eval2.png";
import eval3 from "@/imports/eval3.png";
import eval4 from "@/imports/eval4.png";
import eval5 from "@/imports/eval5.png";
import eval6 from "@/imports/eval6.png";
import portrait from "@/imports/portrait.png";
import antGroup from "@/imports/antGroup.png";
import feishuQA from "@/imports/feishuQA.png";
import yuanmeng from "@/imports/yuanmeng.png";
import sanqian from "@/imports/sanqian.png";
import pinganRobot from "@/imports/pinganRobot.png";
import mideaLogo from "@/imports/mideaLogo.svg";
import antExp from "@/imports/antExp.png";
import mideaExp from "@/imports/mideaExp.png";
import clubAigc from "@/imports/clubAigc.png";
import clubDirector from "@/imports/clubDirector.jpg";
import clubTsinghua from "@/imports/clubTsinghua.jpg";
import clubAward from "@/imports/clubAward.jpg";
import clubNew1 from "@/imports/clubNew1.jpg";
import clubNew2 from "@/imports/clubNew2.jpg";
import clubNew3 from "@/imports/clubNew3.jpg";
import clubNew4 from "@/imports/clubNew4.jpg";
import nineGridTemplate from "@/imports/nineGridTemplate.jpg";
import nineGridMine from "@/imports/nineGridMine.jpg";
import cardCover from "@/imports/cardCover.png";
import cardWide from "@/imports/cardWide.png";

// ─── Image assets ─────────────────────────────────────────────────────────────
const IMGS = {
  portrait,
  dash3: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=900&h=560&fit=crop&auto=format",
};

// ─── Grain ────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.028] mix-blend-overlay" aria-hidden>
      <filter id="g">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#g)" />
    </svg>
  );
}

function BgLayer({ src, opacity = 0.60, grainId, caption, filterCss, overlay = 0.42 }: {
  src: string;
  opacity?: number;
  grainId: string;
  caption: string;
  filterCss?: string;
  overlay?: number;
}) {
  return (
    <>
      <img src={src} alt="" aria-hidden draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity, filter: filterCss ?? "brightness(0.88) saturate(0.72) contrast(1.04)" }}
      />
      {/* Pure black overlay — no color tint */}
      <div className="absolute inset-0 pointer-events-none bg-white" style={{ opacity: overlay }} />
      {/* Film grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none mix-blend-overlay" aria-hidden style={{ opacity: 0.10 }}>
        <filter id={grainId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
      <div className="absolute bottom-5 right-7 pointer-events-none select-none z-[4]">
        <span className="font-['DM_Mono'] text-[9px] tracking-[0.22em] italic text-[#666666]">
          {caption}
        </span>
      </div>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-2xl border-b border-gray-200" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#2B2B2B]">
          罗静
        </button>
        <div className="hidden md:flex items-center gap-7">
          {[["education","教育"],["map","地图"],["experience","经历"],["work","项目"],["hobby","爱好"],["contact","联系"],["egg","彩蛋"]].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className="font-mono text-[12px] tracking-[0.12em] uppercase text-[#444444] hover:text-[#1A1A1A] transition-colors duration-300">
              {label}
            </button>
          ))}
        </div>
        <button onClick={() => go("contact")} className="text-[11px] font-medium tracking-wide text-white bg-[#2F9E6E] border border-[#2F9E6E] rounded-full px-4 py-1.5 hover:bg-[#34D98C] hover:border-[#34D98C] transition-all duration-300">
          联系我
        </button>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onCopilotClick }: { onCopilotClick: () => void }) {
  return (
    <section id="hero" className="min-h-screen bg-[#FAFAF8] flex items-center border-b border-gray-200 relative overflow-hidden">
      <BgLayer
        src={bgDog} grainId="grain-hero" caption="好奇心，是产品人的底色"
        opacity={0.65} overlay={0.38}
        filterCss="brightness(0.90) saturate(0.72) contrast(1.05)"
      />
      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-[256px_1fr] gap-12 lg:gap-20 items-center pt-24 pb-16 relative z-[1]">

        {/* LEFT — ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Lanyard string */}
            <div className="w-px h-8 bg-[#D5D0C8]" />
            {/* Clip */}
            <div className="w-8 h-5 bg-[#C5BFB7] rounded-sm mb-px flex items-center justify-center">
              <div className="w-4 h-3 border border-[#A8A29A] rounded-sm" />
            </div>
            {/* Card */}
            <motion.div
              initial={{ rotate: -3 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 backdrop-blur-md rounded-2xl w-[218px] shadow-[0_20px_60px_rgba(0,0,0,0.40)] border border-gray-200"
            >
              <div className="px-4 pt-3.5 pb-1 flex items-center justify-between">
                <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-[#888888]">/ ID · 2026</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F9E6E]" />
              </div>
              <div className="px-4">
                <div className="rounded-xl overflow-hidden aspect-[3/4] bg-white/90">
                  <img src={IMGS.portrait} alt="罗静" className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="px-4 pt-3 pb-5">
                <div className="text-[#1A1A1A] font-bold text-[22px] leading-none mb-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>罗静</div>
                <div className="font-mono text-[10px] text-[#777777] tracking-wide">Luo "Rain" Jing</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — Editorial */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5 }}
            className="font-mono text-[11px] tracking-[0.2em] text-[#777777] mb-8"
          >
            / 关于我
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Playfair_Display'] font-bold text-[#1A1A1A] leading-[1.08] mb-8"
            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)" }}
          >
            所有新的概念和范式<br />
            <span className="text-[#555555]">都是让 AI 有用，工具好用的方式</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.6 }}
            className="space-y-3.5 text-[#444444] text-[15px] leading-[1.85] mb-10 max-w-[530px]"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            <p>我希望能做出大众真正愿意用的 AI 产品。过去两年，我先后在蚂蚁支付宝、字节飞书、腾讯 IEG、平安科技参与知识问答、AIGC 生成、内容总结等各类 AI 产品，从 toB 到 toC、从交互到评测，一直在实践中体会 AI 能力如何在真实业务链路中创造价值。</p>
            <p>做产品之外，我也在搭建自己的工具链：工作日志平台、评测集构建 Skill 等，这些 Vibe Coding 项目都源于真实的工作需求和好奇心。</p>
            <p>最后~我是罗静，可以叫我老罗，清华大学电子信息专硕在读，可提前实习，意向城市包括上海、深圳等。</p>
          </motion.div>

          {/* Education row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-5 mb-9"
          >
            {[
              { school: "中南大学", major: "信息管理本科", period: "2020 — 2024", logo: csuLogo, bg: "#EEF6FC" },
              { school: "清华大学", major: "电子信息专硕", period: "2024 — 2027", logo: tsinghuaLogo, bg: "#F5F0F8" },
            ].map((edu, i) => (
              <div key={edu.school} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={13} className="text-[#AAAAAA] mr-1" />}
                <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 bg-white/90">
                  <img src={edu.logo} alt={edu.school} className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <div className="text-[#1A1A1A] text-[13px] font-semibold leading-none mb-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>{edu.school}</div>
                  <div className="font-mono text-[10px] text-[#777777]">{edu.major} · {edu.period}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="flex flex-wrap gap-2.5"
          >
            <button onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 bg-white text-[#1A1A1A] text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-[#2F9E6E] hover:text-white transition-all duration-300"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              实习经历
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 text-[#333333] text-[13px] font-medium px-5 py-2.5 rounded-full border border-black/15 hover:border-gray-300 hover:text-[#1A1A1A] transition-all duration-300"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Vibe Coding
              <ArrowUpRight size={13} />
            </button>
            <button onClick={onCopilotClick}
              className="group inline-flex items-center gap-2 text-[#333333] text-[13px] font-medium px-5 py-2.5 rounded-full border border-black/15 hover:border-gray-300 hover:text-[#1A1A1A] transition-all duration-300"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              问问 AI 助手
              <ArrowUpRight size={13} />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section id={id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span className="font-mono text-[10px] text-[#666666] tracking-[0.2em]">{n}</span>
      <div className="h-px w-8 bg-white/90" />
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#888888]">{label}</span>
    </div>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
const eduCards = [
  {
    period: "2024.09 — 2027.06",
    school: "清华大学",
    major: "电子信息专业硕士",
    badge: "保研",
    sub: "Open Fiesta | 互联网＋创新设计方向",
    logo: tsinghuaLogo,
    logoBg: "#F8F4FA",
    items: ["产品设计与开发", "机器学习与强化学习", "人工智能前沿", "社会创新设计 · 交叉学科前沿"],
  },
  {
    period: "2020.09 — 2024.06",
    school: "中南大学",
    major: "信息管理与信息系统",
    badge: "专业第一",
    sub: "经济与管理学院",
    logo: csuLogo,
    logoBg: "#EEF6FC",
    items: ["系统分析与设计 · 管理信息系统", "Java 信息系统开发", "Python 大数据分析", "运筹学 · 商务统计"],
  },
];

function Education() {
  return (
    <Reveal id="education" className="py-24 md:py-32 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        opacity={0.68} overlay={0.40}
        filterCss="brightness(0.85) saturate(0.80) contrast(1.06)"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SLabel n="01" label="教育背景" />
        <h2 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-14 leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
          技术与产品思维<br />
          <em className="italic text-[#2F9E6E]">从这里并行生长</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {eduCards.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-[#2F9E6E]/50 hover:bg-white/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[10px] tracking-[0.15em] text-[#2F9E6E]">{card.period}</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 bg-white/90">
                  <img src={card.logo} alt={card.school} className="w-8 h-8 object-contain" />
                </div>
              </div>
              <h3 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] text-2xl md:text-3xl mb-1">{card.school}</h3>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[#4D4D4D] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{card.major}</p>
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-[#2F9E6E]/10 text-[#2F9E6E] text-[10px] font-medium border border-[#2F9E6E]/20">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="font-mono text-[9px] tracking-[0.1em] text-[#7A8A7E] mb-7">{card.sub}</p>
              <ul className="space-y-3">
                {card.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#333333]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    <div className="w-1 h-1 rounded-full bg-[#2F9E6E] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
const exps = [
  {
    period: "2026.06 — 至今",
    jobTitle: "AI 产品工程师",
    heading: "蚂蚁集团 · 支付宝\nAPP 端内消息速览+平台内部问答机器人",
    summary: "同时负责 to C 的支付宝消息速览工具改版，与 to B 的消息平台智能问答机器人从零搭建，覆盖产品改版、Prompt 开发、评测体系与知识图谱构建。",
    bullets: [
      { label: "项目一 · 支付宝消息速览（to C）", text: "结合 8 场线下用研与线上数据，重新梳理八大消息场景（资金变动、财富收益、快递、行程、医疗、生活服务、安全、权益）与业务规则；主导主页面改版、入口优化与后台管理平台三大模块，其中主页面改版已于 8 月底上线。" },
      { label: "Prompt 开发与评测链路", text: "独立交付 7 个可上线的提示词；从 0 到 1 重构端到端评测链路与评价指标，协助研发完成基座模型能力评估与选型；沉淀《AI 产品评测方法论与操作手册》并上线评测 Skill，显著提升团队评测优化效率。" },
      { label: "项目二 · 消息平台智能问答机器人（to B）", text: "消息平台上下游业务复杂，知识分散在代码、文档等各处，咨询效率低、重复性问题多；从零搭建问答机器人，实现对内提效与对外「接客」；采用图检索增强 GraphRAG，设计三层知识结构（L1 业务语义层 → L2 代码层 + mapping 映射 → L3 操作 SOP），接入代码、语雀知识库、数据表等四类知识；最新效果：Know 类基础咨询完成度 90%，Do 类执行咨询完成度 73%，已接入消息运营平台供产运研使用。" },
    ],
    tags: ["消息速览", "Prompt 工程", "评测体系", "知识图谱"],
    img: antExp,
    imgAlt: "蚂蚁集团 · 产品截图因安全原因暂不贴出",
  },
  {
    period: "2025.11 — 2026.04",
    jobTitle: "AI 产品经理",
    heading: "字节跳动 · 飞书 · 企业知识问答",
    summary: "独立推进多项交互需求从 0 到 GA，搭建 Query 洞察体系与评测链路，季度分析效率提升 70%。",
    bullets: [
      { label: "功能交互类需求", text: "独立负责或核心参与 3 项交互型需求的方案设计与推进，具备从轻立项—评审—开发—联调—测试—GA 的完整经验；其中「全点位新增安全盾牌标识」峰值日点击 1.4w，「主对话支持双选答案」点击率 40%+，「输入框支持 @文档/群组」DAU 为大盘 2.15%。" },
      { label: "策略优化与评测", text: "熟悉对话产品从检索到生成的完整技术链路，搭建涵盖 Scan 深度检索、划词改写、多轮对话、语言判断、数字编码召回、季度 300Q、语种识别等多类评测集；熟练掌握「线上洞察—维度拆解—评测集构建—端到端机评/人评」的完整策略优化链路。" },
      { label: "数据洞察", text: "基于 20 万条线上 Query 独立撰写 prompt，输出《2025 年四季度线上 Query 洞察》报告，系统梳理用户整体意图，并对操作执行、写作、生图等场景的能力短板展开专项分析；推动 Query 意图分类体系建设并实现全链路线上埋点，使季度洞察效率提升 70%，沉淀为后续季度分析的标准方法。" },
    ],
    tags: ["知识问答", "评测优化", "Query 洞察", "交互设计"],
    img: feishuQA,
    imgAlt: "飞书知识问答产品截图",
  },
  {
    period: "2025.08 — 2025.11",
    jobTitle: "AI 产品经理",
    heading: "腾讯 IEG · 游戏 AI 玩法与内部平台优化",
    summary: "负责多款游戏 AI 内容产品及内部平台调研，四期迭代后评论满意度 95%+，同步完成智能体平台竞品分析与美术平台用研。",
    bullets: [
      { label: "元梦之星 · AI 评论", text: "作为产品负责人输出需求文档、搭建人设 Prompt 与安全审核机制，兼顾评论合规性与拟人化效果；打通数据链路，完成外包人工截图到安全审核图的迁移；经四期迭代，最终实现 95%+ 的评论满意度。" },
      { label: "NBA 球星评论分类", text: "结合虎扑爬虫、游戏数值、评论原声等多源数据，梳理分类规则并持续优化效果，推动项目上线，最终实现 95% 的分类准确率。" },
      { label: "剑侠情缘 · AIGC 角色生图", text: "负责玩法与生图方案设计，围绕个性、境界、主灵根、出身四个维度，搭建「选项解析—Prompt 映射—差异化提示词」的完整体系。" },
      { label: "内部平台调研", text: "完成 Coze、腾讯元器、蜘蛛智能体工坊的竞品分析，输出功能对比报告并梳理「小智」平台迭代计划；参与美术平台「三谦」用户研究，输出调研问卷、需求洞察与原画师提效报告。" },
    ],
    tags: ["AIGC", "Prompt 工程", "游戏 AI", "竞品调研"],
    img: yuanmeng,
    imgAlt: "元梦之星 AI 评论截图",
  },
  {
    period: "2025.03 — 2025.08",
    jobTitle: "AI 产品经理",
    heading: "中国平安 · 平安科技 · 销辅机器人",
    summary: "参与车险续保机器人与电话销售座席销辅两款 AI 产品，试点组协销率较对照组提升 20%，最终面向 2 万座席开放。",
    bullets: [
      { label: "智小安 · 车险续保机器人（to C）", text: "跟进各版本需求，覆盖产品解读、异议处理流程、一人名下多车、超级产品等功能；协助梳理业务流程、编写 PRD、维护需求池、补充原型样例、评估版本人力饱和度；对意图识别、异议处理等子模型下发数据标注任务，与工程、算法对接，确保需求高效落地。目前已接入 11 款非车产品，二期在浙江地区全面面客。" },
      { label: "直通 · 电话销售座席销辅机器人（to B）", text: "独立完成 20 余次标注任务下发，涵盖标准制定、过程管控与 Badcase 回收统计，整理优化建议并持续跟踪算法迭代；从意图理解、上下文语义、问答匹配度等维度对蚂小财、度晓保、懂保保开展竞品调研；梳理保险销售服销期、销售期、兜底期各节点的实现情况，明确后续优化方向。" },
      { label: "成果", text: "已覆盖上海、重庆 6000+ 座席试用，试点组策略采纳率达 70%，非车协销率较对照组提升 20%，最终面向 2 万座席全面开放。" },
    ],
    tags: ["保险 AI", "销辅机器人", "数据标注", "意图识别"],
    img: pinganRobot,
    imgAlt: "平安智小安机器人",
  },
  {
    period: "2024.02 — 2024.06",
    jobTitle: "数据分析实习生",
    heading: "美的集团 · 家用空调事业部",
    summary: "在转型 AI 产品前完成数据分析基础训练，建立从业务数字中提炼有效信号的基本直觉。",
    bullets: [
      { label: "数据分析", text: "负责空调产品线销售数据整理与多维度汇总，借助 SQL 与 Python 支撑销售周报/月报产出；参与「以旧换新」竞品市场分析，输出功能对比报告，为产品定价策略提供数据支撑。" },
    ],
    tags: ["数据分析", "Python · Excel", "竞品分析", "商业智能"],
    img: mideaLogo,
    imgFit: "contain",
    imgAlt: "美的集团 Logo",
  },
];

// ─── Internship Map ───────────────────────────────────────────────────────────
// City sticker nodes — 主路锚点，纯视觉装饰
const mapCityNodes = [
  { id: "foshan",   city: "佛山", img: fsCityImg, imgW: 132, x: 9,  y: 64 },
  { id: "shenzhen", city: "深圳", img: szCityImg, imgW: 130, x: 48, y: 68 },
  { id: "hangzhou", city: "杭州", img: hzCityImg, imgW: 108, x: 84, y: 28 },
];

// Company nodes — 支路：5段实习全部可点击
type CoNode = { id: string; num: number; company: string; shortName: string; city: string; role: string; period: string; logo: string | null; emoji: string | null; logoBg: string; x: number; y: number; };
const mapCompanyNodes: CoNode[] = [
  { id: "mide",      num: 1, company: "美的集团",          shortName: "美的",     city: "佛山", role: "数据分析实习生",  period: "2024.02 — 06",       logo: mideaLogo,     emoji: null, logoBg: "#FFF8F0", x: 15, y: 40 },
  { id: "pingan",    num: 2, company: "中国平安·平安科技", shortName: "平安科技", city: "深圳", role: "AI 产品经理",    period: "2025.03 — 08",       logo: pinganLogo,    emoji: null, logoBg: "#FFF5EE", x: 29, y: 25 },
  { id: "tencent",   num: 3, company: "腾讯 IEG",         shortName: "腾讯",     city: "深圳", role: "AI 产品经理",    period: "2025.08 — 11",       logo: tencentLogo,   emoji: null, logoBg: "#EFF4FF", x: 48, y: 20 },
  { id: "bytedance", num: 4, company: "字节跳动·飞书",     shortName: "飞书",     city: "深圳", role: "AI 产品经理",    period: "2025.11 — 2026.04",  logo: bytedanceLogo, emoji: null, logoBg: "#EEF3FF", x: 67, y: 28 },
  { id: "ant",       num: 5, company: "蚂蚁集团·支付宝",   shortName: "蚂蚁",     city: "杭州", role: "AI 产品工程师",  period: "2026.06 — 至今",      logo: antGroup,     emoji: null, logoBg: "#E8F5EE", x: 74, y: 20 },
];

// 深圳 sticker image center (SVG % space) — used as branch origin
const SZ_CX = 48, SZ_CY_TOP = 61, SZ_CY_BASE = 70;

function InternshipMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = mapCompanyNodes.find(n => n.id === activeId) ?? null;

  return (
    <section id="map" className="py-20 md:py-28 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgPink} grainId="grain-map" caption="每一段旅程，都有自己的节奏"
        opacity={0.60} overlay={0.44}
        filterCss="brightness(1.50) saturate(0.55) contrast(0.95)"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <h2 className="font-['Playfair_Display'] font-bold text-[#1A1A1A]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            实习地图
          </h2>
          <p className="text-[#666666] text-base mt-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
            五家公司 · 三座城市 · 四段 AI 产品实习
          </p>
        </div>

        {/* macOS window frame */}
        <div className="rounded-xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.55)] border border-gray-200">
          <div className="h-9 bg-white/90 backdrop-blur-sm flex items-center px-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="font-mono text-[11px] text-[#888888]">internship-trail · 2024 — 2026</span>
            </div>
          </div>

          {/* Map canvas */}
          <div
            className="relative bg-[#EFF4EC]/70 overflow-hidden"
            style={{ height: "480px" }}
            onClick={() => setActiveId(null)}
          >
            {/* Clouds / plant — 纯 SVG 装饰 */}
            <svg className="absolute top-3 left-8 w-14 h-9 opacity-25 select-none pointer-events-none" viewBox="0 0 64 40" fill="none">
              <ellipse cx="22" cy="24" rx="16" ry="10" fill="#fff" />
              <ellipse cx="38" cy="28" rx="18" ry="11" fill="#fff" />
              <ellipse cx="52" cy="30" rx="10" ry="8" fill="#fff" />
            </svg>
            <svg className="absolute top-14 left-1/2 -translate-x-[55%] w-20 h-12 opacity-18 select-none pointer-events-none" viewBox="0 0 64 40" fill="none">
              <ellipse cx="22" cy="24" rx="16" ry="10" fill="#fff" />
              <ellipse cx="38" cy="28" rx="18" ry="11" fill="#fff" />
              <ellipse cx="52" cy="30" rx="10" ry="8" fill="#fff" />
            </svg>
            <svg className="absolute bottom-8 left-[36%] w-8 h-9 opacity-15 select-none pointer-events-none" viewBox="0 0 32 36" fill="none">
              <path d="M16 34 C16 22 10 16 3 14 C12 13 16 8 17 2 C20 10 26 13 31 12 C27 18 24 26 16 34Z" fill="#7FC8A9" />
            </svg>

            {/* SVG paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* 主路：佛山 → 深圳 */}
              <path d={`M 9 ${SZ_CY_BASE} C 24 ${SZ_CY_BASE} 36 ${SZ_CY_BASE} ${SZ_CX} ${SZ_CY_BASE}`}
                stroke="#C4845A" strokeWidth="0.72" strokeDasharray="2.4 1.4" fill="none" strokeLinecap="round" />
              {/* 主路：深圳 → 杭州 */}
              <path d={`M ${SZ_CX} ${SZ_CY_BASE} C 62 68 76 50 84 32`}
                stroke="#C4845A" strokeWidth="0.72" strokeDasharray="2.4 1.4" fill="none" strokeLinecap="round" />
              {/* 支路：佛山 → 美的 */}
              <path d="M 9 52 C 10 49 12 46 15 40"
                stroke="#8FAAC0" strokeWidth="0.52" strokeDasharray="1.6 1.3" fill="none" strokeLinecap="round" />
              {/* 支路：深圳 → 平安 */}
              <path d={`M ${SZ_CX} ${SZ_CY_TOP} C 43 49 36 37 29 25`}
                stroke="#8FAAC0" strokeWidth="0.52" strokeDasharray="1.6 1.3" fill="none" strokeLinecap="round" />
              {/* 支路：深圳 → 腾讯 */}
              <path d={`M ${SZ_CX} ${SZ_CY_TOP} C 48 46 48 34 48 20`}
                stroke="#8FAAC0" strokeWidth="0.52" strokeDasharray="1.6 1.3" fill="none" strokeLinecap="round" />
              {/* 支路：深圳 → 飞书 */}
              <path d={`M ${SZ_CX} ${SZ_CY_TOP} C 53 49 60 38 67 28`}
                stroke="#8FAAC0" strokeWidth="0.52" strokeDasharray="1.6 1.3" fill="none" strokeLinecap="round" />
              {/* 支路：杭州 → 蚂蚁 */}
              <path d="M 84 18 C 81 17 78 18 74 20"
                stroke="#8FAAC0" strokeWidth="0.52" strokeDasharray="1.6 1.3" fill="none" strokeLinecap="round" />
            </svg>

            {/* ── 城市贴纸 (主路锚点，纯视觉) ── */}
            {mapCityNodes.map((city) => (
              <div
                key={city.id}
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <img src={city.img} alt={city.city} draggable={false}
                  className="select-none block drop-shadow-xl"
                  style={{ width: `${city.imgW}px` }} />
                <div className="mt-1 flex justify-center">
                  <div className="bg-white/85 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-gray-200">
                    <span className="text-[13px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "DM Sans, sans-serif" }}>{city.city}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* ── 公司节点 (支路，全部可点击) ── */}
            {mapCompanyNodes.map((co) => {
              const isActive = activeId === co.id;
              return (
                <div key={co.id}
                  style={{ left: `${co.x}%`, top: `${co.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setActiveId(isActive ? null : co.id); }}
                >
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                    <div className="w-7 h-7 rounded-full bg-[#EDE2CC] border-2 border-[#8FAAC0] flex items-center justify-center font-bold text-[#5A82A0] text-[12px] shadow-md select-none">
                      {co.num}
                    </div>
                  </div>
                  <div className={`w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-200 ${
                    isActive ? "border-[#C4845A] scale-110 shadow-[0_8px_28px_rgba(0,0,0,0.22)]" : "border-gray-300 hover:scale-110 hover:shadow-[0_4px_18px_rgba(0,0,0,0.16)]"
                  }`} style={{ background: co.logoBg }}>
                    {co.logo
                      ? <img src={co.logo} alt={co.shortName} className="w-9 h-9 object-contain" draggable={false} />
                      : <span className="text-[26px]">{co.emoji}</span>
                    }
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className="bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm border border-gray-200 whitespace-nowrap">
                      <span className="text-[12px] font-semibold text-[#1A1A1A]" style={{ fontFamily: "DM Sans, sans-serif" }}>{co.shortName}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Popup ── */}
            <AnimatePresence>
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute z-30 w-[210px]"
                  style={{
                    left: `${Math.min(Math.max(active.x, 14), 72)}%`,
                    top: active.y < 46 ? `${active.y + 14}%` : `${active.y - 60}%`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-[#FFFFFF]/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_64px_rgba(0,0,0,0.60)] overflow-hidden border border-gray-200">
                    <div className="h-[88px] flex items-center justify-center overflow-hidden" style={{ background: active.logoBg }}>
                      {active.logo
                        ? <img src={active.logo} alt={active.shortName} className="w-24 h-14 object-contain" draggable={false} />
                        : <span className="text-[52px]">{active.emoji}</span>
                      }
                    </div>
                    <div className="p-4">
                      <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#B46A3D] mb-1">{active.role} · {active.city}</div>
                      <div className="font-['Playfair_Display'] font-bold text-[#1A1A1A] text-[15px] leading-snug mb-0.5">{active.company}</div>
                      <div className="font-mono text-[11px] text-[#666666] mb-3">{active.period}</div>
                      <button
                        onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                        className="w-full bg-[#C4845A] text-white text-[12px] font-medium py-2 rounded-xl hover:bg-[#B07248] transition-colors flex items-center justify-center gap-1.5"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        查看详情 <ArrowUpRight size={11} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ─────────────────────────────────────────────────────────────
function Experience() {
  return (
    <Reveal id="experience" className="py-24 md:py-32 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgGreen} grainId="grain-exp" caption="每一段经历，都在开花"
        opacity={0.62} overlay={0.45}
        filterCss="brightness(0.88) saturate(0.65) contrast(1.06)"
      />
      <div className="absolute pointer-events-none" style={{ width: "55%", height: "70%", top: "10%", right: "-15%", background: "radial-gradient(ellipse at 60% 40%, rgba(79,193,140,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} aria-hidden />

      <div className="max-w-6xl mx-auto relative z-10">
        <SLabel n="02" label="实习经历" />

        <div className="mb-14 max-w-xl">
          <h2 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] text-2xl md:text-3xl mb-4 leading-snug">
            把 AI 能力转化为<br />
            <em className="italic text-[#1E9E66]">更稳定、更清晰的产品体验</em>
          </h2>
          <p className="text-[#555555] text-sm leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
            高精力、高执行力、高感知力。
          </p>
        </div>

        <div className="space-y-0">
          {exps.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-12 border-t border-[rgba(47,158,110,0.14)]"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="font-mono text-[10px] tracking-[0.15em] text-[#2F9E6E] mb-3">{exp.period} · {exp.jobTitle}</div>
                <h3 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] text-xl md:text-2xl mb-3">
                  {exp.heading.split("\n").map((line, li) => (
                    <span key={li}>{line}{li < exp.heading.split("\n").length - 1 && <br />}</span>
                  ))}
                </h3>
                <p className="text-[#1E9E66] text-[13px] leading-relaxed mb-5 italic" style={{ fontFamily: "DM Sans, sans-serif" }}>{exp.summary}</p>
                <ul className="space-y-3 mb-6">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 text-[13px] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      <span className="flex-shrink-0 mt-[3px] w-1.5 h-1.5 rounded-full bg-[#2F9E6E] opacity-70" />
                      <span>
                        <span className="text-[#7A8A7E] font-medium">{b.label}：</span>
                        <span className="text-[#555555]">{b.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(t => (
                    <span key={t} className="font-mono text-[9px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-[rgba(47,158,110,0.25)] text-[#1E9E66]">{t}</span>
                  ))}
                </div>
              </div>

              <div className={`group relative rounded-xl overflow-hidden aspect-[16/10] ${exp.imgFit === "contain" ? "bg-white" : "bg-[#EAF4EE]"} ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <img src={exp.img} alt={exp.imgAlt} className={`w-full h-full ${exp.imgFit === "contain" ? "object-contain p-6" : "object-cover"} group-hover:scale-[1.03] transition-all duration-700`} />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#999999]">{exp.imgAlt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Project types & data ─────────────────────────────────────────────────────
interface Project {
  id: string; cat: string; year: string; title: string; subtitle: string; desc: string;
  img: string; span: string; imgAspect: string; imgPosition?: string; status: "已上线" | "开发中" | "Skill";
  tags: string[]; fullDesc: string; whyDesign: string; highlights: string[]; mockupImg: string; gallery?: string[];
  detailAspect?: string; detailFit?: "cover" | "contain"; detailBg?: string;
}

const projects: Project[] = [
  {
    id: "diary",
    cat: "工具 · 实习记录",
    year: "2026",
    title: "高效工作助手",
    subtitle: "work-diary",
    desc: "个人高效工作追踪系统：自动汇聚语雀、钉钉、CodeFuse 等工作碎片，以多维表格替代数据库，AI 自动总结工作产出、提取待办、生成周报月报与汇报材料，并对每项工作经历做 OKR 相关度判断，让精力聚焦在真正重要的事项上。",
    img: diaryCover, span: "md:col-span-1", imgAspect: "aspect-[4/3]", imgPosition: "top",
    status: "开发中",
    tags: ["工作记录", "OKR 追踪", "自动报告", "Vibe Coding"],
    fullDesc: "从实习第一天开始维护的个人工作记录仓库。覆盖 6 种记录类型（语雀文档、钉钉消息、CodeFuse file-history、本地文件、手动录入、语音速记），通过 AI 自动总结为工作记录、提取 Todo、生成周报月报；OKR 看板自动计算每条记录与目标的关联度，支持 7 天趋势追踪；述职与答辩导出可一键生成结构化的 AI 总结报告，显著降低「写汇报」的认知负担。",
    whyDesign: "高效工作的前提，是让「记录」和「总结」不再消耗额外精力。从第一天就自动沉淀工作碎片，需要汇报时直接筛选组织，而不是从零回忆。这是最低成本的个人知识管理方式。",
    highlights: ["5 大数据源自动采集（语雀 / 钉钉 / CodeFuse / 本地 / 手动）", "AI 待办提取 + AI 周报月报 + 述职导出", "OKR 关联度自动计算与 7 天趋势", "零框架依赖，单文件 HTML + Node 脚本部署"],
    mockupImg: diaryHero,
    gallery: [diaryHero, diaryFeatures, diaryInput, diaryOutput, diaryOKR, diaryInfra],
  },
  {
    id: "eval",
    cat: "Skill · 评测",
    year: "2026",
    title: "评测集构建工具",
    subtitle: "robert-evaluation-set-builder",
    desc: "从需求文本、会议纪要或 AI 听记出发，自动完成需求澄清 → 维度拆解 → 文档撰写 → 表格创建，输出语雀文档 + 钉钉多维表格。",
    img: evalCover, span: "md:col-span-1", imgAspect: "aspect-[4/3]", imgPosition: "left",
    status: "Skill",
    tags: ["Evaluation", "自动化", "语雀", "Claude Skill"],
    fullDesc: "评测集构建是 AI 产品中最耗时也最容易出错的环节之一。这个 Skill 遵循无偏、真实、迭代、渐进四大设计原则：你只需输入一句评测需求，模型会主动追问澄清背景、范围与目标；随后自动拆解维度、生成示例 Case，最终产出两份标准化交付物——结构化的语雀需求文档和带 13 列标准字段的钉钉多维表格。在飞书和蚂蚁实习期间持续使用，已沉淀为可复用的工作流。",
    whyDesign: "每次搭建评测集都要重复同样的步骤：拆解需求 → 定义维度 → 设计测试用例 → 整理文档。这些步骤有规律可循，却消耗大量时间。把它做成 Skill 后，只需一句好需求，模型就会通过多轮追问补齐上下文，再自动生成两份可用文档，让我把精力放在关键判断而不是格式整理上。",
    highlights: ["一句需求输入，模型主动追问澄清", "自动拆解评测维度与示例 Case", "输出语雀文档 + 钉钉多维表格（13 列标准字段）", "沉淀无偏、真实、迭代、渐进的评测原则"],
    mockupImg: eval1,
    gallery: [eval1, eval2, eval3, eval4, eval5, eval6],
    detailAspect: "aspect-auto",
    detailFit: "contain",
    detailBg: "bg-[#F5F5F5]",
  },
  {
    id: "card",
    cat: "Skill · 内容设计",
    year: "2026",
    title: "AI 产品宣传卡片",
    subtitle: "skill-promo-card",
    desc: "从 guizang-social-card-skill 衍生，聚焦 AI 产品与 Skill 宣传卡；新增离线图标库与截图智能取色，让卡片配色贴合真实产品界面。",
    img: cardCover, span: "md:col-span-1", imgAspect: "aspect-[4/3]",
    status: "Skill",
    tags: ["内容设计", "Swiss Style", "智能取色", "Claude Skill"],
    fullDesc: "基于 guizang-social-card-skill 的视觉系统，聚焦为 AI 产品与 Skill 生成可直接发的小红书 / 公众号 / 微信横图宣传卡片。在自身实际使用过程中，针对截图裁切、配色情感、呼吸留白、文案表达、功能呈现等问题做了多轮针对性微调；并补上了原版没有的新能力——离线图标库与截图智能取色：给任意产品截图即可自动提取主色 / 辅助色 / 背景 / 文字色，让卡片配色与产品真实界面保持一致。",
    whyDesign: "宣传物料最大的成本不是'生成一张图'，而是'生成一张能看的图'。基于实际使用，对截图裁切、配色、文案做了多轮微调，并补上了离线图标库与截图智能取色两个新能力。",
    highlights: ["从 guizang 衍生，在实际使用中持续微调版式/文案/配色细节", "离线图标库：20 个 SVG 图标，断网也能完整渲染", "截图智能取色：自动提取主色/辅助色/背景/文字色", "支持小红书 / 公众号 / 微信横图等多平台尺寸"],
    mockupImg: cardWide,
    gallery: [cardWide],
    detailAspect: "aspect-[21/9]",
    detailFit: "contain",
    detailBg: "bg-[#F5F5F5]",
  },
  {
    id: "proto",
    cat: "Skill · 原型",
    year: "2026",
    title: "原型转交互 Demo",
    subtitle: "prototype-to-demo",
    desc: "把 Figma / Axure / 手绘 / 截图等原型，通过 6 步工作流生产为可分享的单文件 HTML Demo，迭代逼近真实产品体验。",
    img: protoCover, span: "md:col-span-1", imgAspect: "aspect-[4/3]", imgPosition: "top",
    status: "Skill",
    tags: ["原型还原", "HTML Demo", "像素级验证", "Claude Skill"],
    fullDesc: "产品评审和用户测试中，静态原型图往往无法传达真实的交互感。这个 Skill 通过六步闭环（读原型与拆解动线 → 组件化搭建页面 → 资产分离与画布适配 → 实现自然交互 → 截图验证与视觉修正 → 打包与验收），将任意格式原型转化为可在浏览器中直接运行的单文件 HTML Demo。内置 20×20 网格像素级采样对比，实测还原度达 97.5%；单文件零依赖，拷贝到任何设备都能直接打开。",
    whyDesign: "评审会上放一个能点击的 Demo，比展示静态截图效果好 10 倍。但把原型图转成代码通常需要几个小时。六步工作流把这个时间压缩到几分钟，让每次评审都能用上可交互的 Demo。更关键的是，用户调研阶段真实产品往往尚未开发完成，一个可点击的高保真 Demo 能让用户提前进入真实使用情境，获得更有代入感的反馈，而不是对着静态图凭空想象。",
    highlights: ["支持 Figma / Axure / 截图 / 手绘稿等多格式输入", "六步工作流端到端自动化", "20×20 网格像素级采样验证，还原度 97.5%", "单文件 HTML 零依赖，分享即用"],
    mockupImg: proto1,
    gallery: [proto1, proto2, proto3],
  },
];

// ─── Project Page ─────────────────────────────────────────────────────────────
function ProjectPage({ project, onBack }: { project: Project; onBack: () => void }) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.mockupImg];
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); setActiveImg(0); }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#FAFAF8]"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Back nav */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-[56px] flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200 font-mono text-[11px] tracking-[0.1em] uppercase"
          >
            <ArrowLeft size={14} />
            返回项目
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-[1fr_420px] gap-14 items-start">
        {/* LEFT */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className={`font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${STATUS_STYLE[project.status]}`}>
              {project.status}
            </span>
            {project.tags.map(t => (
              <span key={t} className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border border-[rgba(47,158,110,0.25)] text-[#2F9E6E]">{t}</span>
            ))}
          </div>
          <div className="font-mono text-[10px] tracking-[0.12em] text-[#777777] mb-3">{project.subtitle}</div>
          <h1 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] leading-tight mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {project.title}
          </h1>
          <p className="text-[#444444] text-[15px] leading-[1.85] mb-10">{project.fullDesc}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#2F9E6E] mb-4">为何设计</div>
              <p className="text-[#4D4D4D] text-sm leading-relaxed">{project.whyDesign}</p>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#2F9E6E] mb-4">核心亮点</div>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#555]">
                    <span className="flex-shrink-0 mt-[5px] w-1.5 h-1.5 rounded-full bg-[#2F9E6E] opacity-60" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT — gallery */}
        <div className="md:sticky md:top-20">
          <div className={`rounded-2xl overflow-hidden ${project.detailBg ?? "bg-white"} ${project.detailAspect ?? "aspect-[4/5]"} relative border border-gray-200`}>
            <img
              key={activeImg}
              src={gallery[activeImg]}
              alt={project.title}
              style={{ objectPosition: project.imgPosition ?? "center" }}
              className={`w-full h-full ${project.detailFit === "contain" ? "object-contain" : "object-cover"}`}
            />
            {gallery.length > 1 && (
              <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.12em] text-[#666666] bg-white/70 px-2 py-1 rounded-lg backdrop-blur-sm">
                {activeImg + 1} / {gallery.length}
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-200 ${
                    i === activeImg ? "border-[#2F9E6E] opacity-100" : "border-gray-200 opacity-45 hover:opacity-80"
                  }`}
                >
                  <img src={g} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between px-1">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#888888]">{project.cat}</span>
            <span className="font-mono text-[10px] text-[#888888]">{project.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Chat Widget ──────────────────────────────────────────────────────────────
const SUGGESTED = ["她适合 AI 产品经理岗位吗？", "她的评测体系经验是什么？", "她做过哪些 AI 对话产品？", "可以提前实习吗？"];

// ── AI 对话配置（来自 .env，VITE_ 前缀会暴露在前端，仅供演示）──
const API_KEY = import.meta.env.VITE_API_KEY ?? "";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "https://api.deepseek.com").replace(/\/+$/, "");
const MODEL = import.meta.env.VITE_MODEL ?? "deepseek-chat";

// ── 方法论知识库（本地轻量 RAG：按标题切块 + 关键词打分，命中则注入上下文）──
const KNOWLEDGE_DOCS = [
  { name: "AI 产品经理核心知识体系", md: coreMd },
  { name: "AI PM 知识储备·开发篇", md: devMd },
  { name: "AI PM 知识储备·AI 篇", md: aiMd },
  { name: "策略产品白皮书：AI Agent、搜索策略、广告商业化与职业发展", md: strategyMd },
];

type KbChunk = { doc: string; title: string; text: string };

function buildChunks(): KbChunk[] {
  const chunks: KbChunk[] = [];
  for (const doc of KNOWLEDGE_DOCS) {
    const lines = doc.md.split(/\r?\n/);
    let title = doc.name;
    let buf: string[] = [];
    const flush = () => {
      // 去掉飞书图片链接行，压缩连续空行
      const text = buf
        .join("\n")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
      if (text) chunks.push({ doc: doc.name, title, text });
      buf = [];
    };
    for (const line of lines) {
      // 切块点：Markdown 标题（#/##/###）与中文数字章节（**一、…**）
      const h =
        line.match(/^(#{1,6})\s+(.+)$/) ||
        line.match(/^\*\*\s*([一二三四五六七八九十]+、[^*]+?)\s*\*\*$/);
      if (h) {
        flush();
        title = (h[2] ?? h[1]).trim().replace(/^\*+|\*+$/g, "") || doc.name;
      }
      buf.push(line);
    }
    flush();
  }
  return chunks;
}

const KB_CHUNKS = buildChunks();

// 中文虚字表：2-gram 检索词若含这些字视为无意义（避免"什么""怎么"等噪音命中）
const STOP_CHARS = new Set(
  "的了吗呢啊吧呀哦呵嗯是什怎么何有没在与和及或用能可做这那一不也很更最就都会要于之其个她他它我你向对从到把被让为着得"
);

function kbSegs(query: string): string[] {
  const q = query.toLowerCase();
  const segs = new Set<string>();
  const add = (s: string) => {
    if (s && s.length >= 2) segs.add(s);
  };
  // 英文单词 / 数字 / 技术符号
  for (const m of q.matchAll(/[a-z0-9][a-z0-9_\-\/\.]{1,}/g)) add(m[0]);
  // 中文连续片段：保留整段 + 生成 2-gram（纯虚字片段如"什么是/为什么"不作为检索词）
  for (const run of q.match(/[\u4e00-\u9fa5]+/g) ?? []) {
    if (![...run].every(ch => STOP_CHARS.has(ch))) add(run);
    if (run.length >= 4) {
      for (let i = 0; i + 2 <= run.length; i++) {
        const g = run.slice(i, i + 2);
        if (![...g].some(ch => STOP_CHARS.has(ch))) add(g);
      }
    }
  }
  return [...segs];
}

// 含"她/他/罗静"等强个人指代时，视为询问罗静本人经历（以简历档案为准），知识库只接受强相关块
function isAboutHer(query: string): boolean {
  return /[她他]|罗静|自己|我的/.test(query);
}

function searchKnowledge(query: string, k = 2): string {
  const raw = query.trim();
  if (!raw) return "";
  const segs = kbSegs(raw);
  const rawLower = raw.toLowerCase();
  // 普通问题：标题/整句命中即可；本人问题：需标题+正文双命中的强相关块
  const minScore = isAboutHer(raw) ? 16 : 8;
  const hits = KB_CHUNKS.map(chunk => {
    const title = chunk.title.toLowerCase();
    const text = chunk.text.toLowerCase();
    let score = 0;
    for (const s of segs) {
      if (title.includes(s)) score += 8;
      else if (text.includes(s)) score += 3;
    }
    if (text.includes(rawLower)) score += 10;
    return { chunk, score };
  })
    .filter(h => h.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
  if (hits.length === 0) return "";
  return hits
    .map(({ chunk }, i) => {
      let text = chunk.text;
      if (text.length > 600) text = text.slice(0, 600) + "…（节选）";
      return `[${i + 1}]《${chunk.doc}》·${chunk.title}\n${text}`;
    })
    .join("\n\n---\n\n");
}

// ── 罗静档案（由四份知识文档整理注入，AI 据此回答访客问题）──
const SYSTEM_PROMPT = `你是罗静的专属 AI 助手，运行在她的个人主页上。请基于下面的"罗静档案"回答访客关于罗静的任何问题。

回答要求：
1. 用中文，语气亲切自然，像一位熟悉罗静的同事；
2. 优先引用档案中的具体事实（公司、项目、数据、时间、效果），把亮点讲透，避免泛泛而谈；
3. 回答信息量要充足：一般 200-300 字，用分句或分点展开，不要一句话带过；访客明确要求简短或连续追问时才精简；
4. 每次回答的结尾，必须给出 1-2 个与主题相关的引导追问（follow-up），用下面的固定格式单独输出在回答末尾（正文中不要再重复这些问句），页面会把它们渲染成可点击的按钮，访客点击即可追问，让对话自然延续：
【继续了解】
1. 追问一
2. 追问二
5. 档案中没有的信息，不要编造，坦诚说明并建议访客直接联系罗静（邮箱 luojing_rain02@163.com，电话 18874032839）。
6. 系统可能会在访客问题前附带【知识库参考】（来自罗静多年积累的方法论知识库：AI 产品岗位认知、开发基础、AI 技术原理、推荐链路、评测方法论，以及策略产品白皮书——AI Agent 方法论、搜索策略、广告商业化、产品经理职业发展等宏观方向）。若问题涉及技术原理、算法、开发知识、评测方法，或 Agent / 搜索策略 / 广告商业化 / 职业发展等宏观话题，请优先结合【知识库参考】中的内容组织回答，用自己的话讲清楚、讲出深度，不要照搬原文，也不要提及"知识库"字样。
7. 当访客询问罗静本人的能力、经验、亮点（如"她擅长什么""有什么沉淀""会不会做 Skill"）时，不要只讲实习项目，还要主动结合档案第五节"方法论沉淀与个人知识库"介绍她在这方面的积累（经验产品化、知识体系化、工具化思维），并可在回答中自然呼应知识库覆盖的领域（Skill/Agent、RAG、评测、推荐链路、策略产品等）作为她的知识储备佐证；但不要编造档案之外的具体数字或项目。
8. 当访客对罗静的某段经历或某个领域（如 Agent、搜索、广告、评测）感兴趣时，除了回答具体细节，末尾的【继续了解】追问可以适度往宏观方法论上引一层——例如从"某个功能怎么做的"延伸到"这类产品的一般设计思路 / 落地框架 / 商业化考量"，既回答当下问题，也让访客看到她的全局视野；不要每一问都这样，穿插使用即可。

【罗静档案】

一、基础信息
姓名：罗静。27 届校招（清华大学电子信息专硕在读，2024.09-2027.06）。联系电话：18874032839。邮箱：luojing_rain02@163.com。意向工作地：上海 / 广深 / 杭州。可提前实习。

二、教育背景
- 清华大学｜Open Fiesta｜互联网+创新设计方向 电子信息（2024-2027）：产品设计与开发、机器学习与强化学习、人工智能前沿、互联网思维与技术等。
- 中南大学｜信息管理与信息系统（2020-2024）：系统分析与设计、大数据分析（Python）、Java 信息系统开发、运筹学、商务统计等。

三、实习经历
1. 蚂蚁集团｜支付宝｜消息速览 + 平台问答机器人 AI 产品工程师（2026.06 至今）
   - 端内消息速览（to C）：梳理八大消息场景，主导主页面改版；输出 7 个上线提示词，从 0 到 1 搭建端到端评测链路，沉淀《AI产品评测方法论与操作手册》并上线评测 Skill。
   - 平台问答机器人（to B）：针对上下游业务复杂、知识分散、重复咨询多的问题从零搭建，实现对内提效与对外"接客"；采用图检索增强 GraphRAG，设计"业务语义层→代码层+mapping→操作 SOP"三层知识结构，接入代码、语雀知识库、数据表等四类知识；Know 类完成度 90%，Do 类 73%，已接入消息运营平台供产运研使用。
2. 字节跳动｜飞书｜企业知识问答 AI 产品经理（2025.11-2026.04）
   - 交互：独立负责"安全盾牌标识"（峰值日点击 1.4w）、"主对话双选答案"（点击率 40%+）、"输入框 @文档/群组"（DAU 占大盘 2.15%）并推进上线。
   - 评测：搭建 Scan 深度检索、划词改写、多轮对话、季度 300Q、语种识别等评测集，熟悉"检索→生成"机评/人评链路。
3. 腾讯｜IEG｜游戏 AI 玩法与内部平台 AI 产品经理（2025.08-2025.11）
   - 元梦之星 UGC 地图 AI 评论：搭建人设 Prompt 与安全审核机制，四期优化后满意度 95%+。
   - NBA 球星评论分类准确率 95%；剑侠情缘 AIGC 角色生图：个性/境界/主灵根/出身四维 Prompt 映射体系。
4. 中国平安｜平安科技｜AI 产品经理（2025.03-2025.08）
   - "智小安"车险续保机器人：已接入 11 款非车产品，在浙江地区全面面客。
   - 电话销售销辅机器人：向 6000+ 座席试用，策略采纳率 70%，非车协销率提升 20%，最终面向 2w 座席开放。

四、专业技能
- 产品能力：用户调研、竞品分析、需求挖掘、Figma/Axure/UML、PRD、项目推进上线的全流程。
- AI 知识：大模型（Skill、MCP、RAG、SFT、提示词工程），有编程经验与代码功底，熟悉 Vibe Coding，能高效构建智能体产品。
- 数据能力：Python、SQL、Excel，独立完成取数、清洗、分析与 Tableau/Power BI 可视化看板。
- 开发经验：Java 基础，多次前后端分离信息系统与微信小程序开发经验。

五、方法论沉淀与个人知识库（她区别于一般实习生的核心亮点，回答能力类问题时优先提及）
- 经验产品化：在蚂蚁把消息速览的评测链路从数据采集、指标定义到 Badcase 沉淀抽象成《AI产品评测方法论与操作手册》，并直接上线了可被调用的"评测 Skill"，把"怎么做评测"变成一套可复用的产品化能力。
- 知识体系化：系统性维护自己的 AI 产品经理知识库，覆盖"岗位认知、开发技术基础（前端/后端/数据库/API/Git）、AI 技术原理（RAG、SFT、提示词工程、推荐链路、Agent/Skill/MCP、评测方法论）"三大板块，内容持续迭代，既有深度也有广度。
- 工具化思维：熟悉用 Claude、Coze、腾讯元器等 AI 工具链构建 Skill / Agent / 智能体，能自己动手写代码（Vibe Coding）快速验证想法，既是产品经理也是"半个工程师"。

六、兴趣爱好
清华大学 DK5s 街舞社社长、艺术团街舞队队长；总导演策划建社 10 年首场专场演出；多次高校齐舞冠军、freestyle 冠军。

七、回答风格示例（三问，均按"详细展开 + 结尾引导追问"输出）
- "她适合 AI 产品经理岗位吗？"→ 非常适合。四段实习覆盖 AI 产品核心方向：蚂蚁做端内消息速览与问答机器人，从 0 到 1 搭评测链路并沉淀方法论；飞书负责企业知识问答交互，"安全盾牌标识"峰值日点击 1.4w；腾讯做游戏 AI 评论与 AIGC 角色生图；平安做续保与销辅机器人。加上清华电子信息专硕背景，技术和产品兼备。
【继续了解】
1. 她在飞书具体负责过哪些功能？
2. 她在蚂蚁做过什么项目？
- "她做过哪些 AI 对话产品？"→ 很丰富。to B 有飞书企业知识问答（RAG 检索增强）和蚂蚁平台内部问答机器人（GraphRAG 三层知识结构，Know 类完成度 90%、Do 类 73%）；to C 有蚂蚁端内消息速览智能体和腾讯元梦之星 AI 评论；还有平安车险续保机器人"智小安"与电话销售销辅机器人。
【继续了解】
1. 她做的问答机器人知识结构是怎样的？
2. 她做过 AIGC / 生成式 AI 相关的工作吗？
- "她在方法论 / Skill 方面有什么积累？"→ 这是她区别于一般实习生的核心亮点。在蚂蚁把消息速览评测链路抽象成《AI产品评测方法论与操作手册》，并上线可复用的"评测 Skill"；工作之余系统维护 AI 产品经理知识库，覆盖岗位认知、开发基础、AI 技术原理（RAG、SFT、推荐链路、Agent/Skill/MCP、评测方法论）三大板块。经验产品化 + 知识体系化，让她既懂产品也懂实现。
【继续了解】
1. 她的评测 Skill 具体是怎么做的？
2. 她的知识库都涵盖哪些内容？
- "她怎么看 AI Agent / 搜索策略 / 广告商业化这些宏观方向？"→ 她把这些当成一套能落地的框架来聊：Agent 是"记忆-规划-工具"的结构化组合，搜索策略要平衡相关性、个性化与生态，广告商业化则是"用户价值 × 流量 × 付费意愿"的系统工程。结合她在消息速览、问答机器人、企业知识问答、AIGC 生图等从 to C 到 to B 的落地经验，能把宏观概念讲成可执行的思路，而不只是名词。
【继续了解】
1. 她怎么把这些方法论落进实际产品？
2. 她对策略产品经理这个岗位怎么看？`;

// 对话消息类型（与 OpenAI Chat Completions 消息格式兼容）
type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

// ── 轻量 Markdown 渲染（已转义防 XSS，仅支持 **加粗**、`代码`、换行与列表）──
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatBotText(text: string): string {
  let html = escapeHtml(text)
    .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /`([^`]+?)`/g,
      '<code style="background:rgba(47,158,110,0.12);color:#1B7A52;padding:1px 5px;border-radius:4px;font-size:0.92em">$1</code>'
    );
  return html
    .replace(/^[-\u2022]\s+/gm, "\u2022 ")
    .replace(/\n{2,}/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

// ── 解析回答末尾的「【继续了解】」追问块，拆成正文 + 可点击的问题列表 ──
function parseFollowUps(text: string): { body: string; questions: string[] } {
  const marker = "【继续了解】";
  const idx = text.lastIndexOf(marker);
  if (idx < 0) return { body: text, questions: [] };
  const body = text.slice(0, idx).trimEnd();
  const tail = text.slice(idx + marker.length);
  const questions = tail
    .split(/\n/)
    .map(s => s.replace(/^\s*\d+[.、)）]\s*/, "").trim())
    // 过滤空串、截断提示、过短的残缺问句（如"她做问答"）
    .filter(s => s.length >= 6 && !s.includes("截断") && !s.startsWith("…"));
  return { body, questions };
}

function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "你好！我是罗静的 AI 助手。你可以问我关于她的实习经历、技术能力或求职意向～" },
  ]);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(""); // 当前正在流式输出的回答
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setMessages(prev => [...prev, { role: "user" as const, text: q }]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      // 携带最近历史消息，保持多轮对话上下文（去掉「【继续了解】」追问块；只保留最近 6 条防止无限膨胀）
      const history: ChatMsg[] = messages.slice(-6).map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.role === "user" ? m.text : parseFollowUps(m.text).body,
      }));
      // 检索方法论知识库，命中则注入访客问题上下文（本地轻量 RAG）
      const kb = searchKnowledge(q);
      const userContent = kb ? `【知识库参考】\n${kb}\n\n访客问题：${q}` : q;
      const res = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: userContent },
          ],
          temperature: 0.6,
          max_tokens: 2000,
          stream: true,
        }),
      });

      // 非 2xx：读取 OpenAI 格式的 JSON 错误信息
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const apiErr = (data as { error?: { message?: string } })?.error?.message ?? `HTTP ${res.status}`;
        throw new Error(apiErr);
      }

      // 流式读取 SSE 响应，边读边渲染（每 3 个分片刷新一次，避免高频重渲染卡顿）
      const reader = res.body!.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let full = "";
      let renderTick = 0;
      let finishReason = "";
      setStreaming("");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        for (const evt of events) {
          for (const line of evt.split("\n")) {
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const json = JSON.parse(payload);
              const delta: unknown = json?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta) {
                full += delta;
                if (++renderTick % 3 === 0) {
                  setStreaming(full);
                  scrollToBottom();
                }
              }
              const fr: unknown = json?.choices?.[0]?.finish_reason;
              if (typeof fr === "string") finishReason = fr;
            } catch {
              // 忽略无法解析的分片
            }
          }
        }
      }
      // 兜底：流结束时可能残留未以 \n\n 结尾的最后一个 data 行（网络抖动/异常中断场景）
      if (buffer) {
        for (const line of buffer.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta: unknown = json?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) full += delta;
          } catch {
            // 忽略无法解析的分片
          }
        }
      }
      // 检测输出被 max_tokens 截断：若截断点落在【继续了解】区域内，先清掉残缺的追问块，再把提示补在正文末尾
      if (finishReason === "length") {
        const marker = "【继续了解】";
        const idx = full.lastIndexOf(marker);
        if (idx >= 0) full = full.slice(0, idx).trimEnd();
        full += "\n\n…（本次回答较长被截断，可继续追问让我补充完整）";
      }

      if (!full) throw new Error("empty"); // 偶发空回答保护
      setStreaming(full);
      setMessages(prev => [...prev, { role: "bot", text: full }]);
      setStreaming("");
    } catch (err) {
      const detail = err instanceof Error ? err.message : "";
      const msg = /balance|insufficient|402/i.test(detail)
        ? "AI 服务暂时不可用（账户余额不足），站长充值后就能恢复啦～也可以直接联系罗静：luojing_rain02@163.com"
        : "网络出了一点小问题，请稍后再试～也可以直接联系罗静：luojing_rain02@163.com";
      setMessages(prev => [...prev, { role: "bot", text: msg }]);
    } finally {
      setLoading(false);
      setStreaming("");
      scrollToBottom();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50 w-[360px] rounded-2xl bg-white shadow-[0_8px_48px_rgba(0,0,0,0.14)] border border-[rgba(47,158,110,0.15)] overflow-hidden"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(47,158,110,0.1)] bg-[#FAFAFA]">
        <div className="w-8 h-8 rounded-full bg-[#2F9E6E] flex items-center justify-center text-white">
          <Bot size={15} />
        </div>
        <div className="flex-1">
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#2F9E6E]">Profile Copilot</div>
          <div className="text-[11px] text-[#888]">罗静的 AI 助手 · 检索·归纳·回答</div>
        </div>
        <button onClick={() => setMinimized(m => !m)} className="text-[#BBB] hover:text-[#888] transition-colors p-1">
          <Minus size={13} />
        </button>
        <button onClick={onClose} className="text-[#BBB] hover:text-[#888] transition-colors p-1">
          <X size={13} />
        </button>
      </div>

      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {/* Messages */}
            <div className="h-[280px] overflow-y-auto px-4 py-4 space-y-3 text-[13px]">
              {messages.map((m, i) => {
                const parsed = m.role === "user" ? null : parseFollowUps(m.text);
                return (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#2F9E6E] text-white rounded-br-sm"
                        : "bg-[#E8F5EE] text-[#333] rounded-bl-sm"
                    }`}>
                      {m.role === "user" ? (
                        m.text
                      ) : (
                        <>
                          <div dangerouslySetInnerHTML={{ __html: formatBotText(parsed!.body) }} />
                          {parsed!.questions.length > 0 && (
                            <div className="mt-2.5 flex flex-col gap-1.5">
                              {parsed!.questions.map(q => (
                                <button key={q} onClick={() => send(q)}
                                  className="text-left text-[12px] text-[#2F9E6E] bg-white hover:bg-[#E0F3EA] border border-[rgba(47,158,110,0.25)] rounded-lg px-3 py-1.5 transition-colors duration-200"
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {loading && !streaming && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-3 rounded-2xl bg-[#E8F5EE] rounded-bl-sm flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#2F9E6E]/60 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {streaming && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl bg-[#E8F5EE] text-[#333] rounded-bl-sm leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatBotText(parseFollowUps(streaming).body),
                      }}
                    />
                    <span className="inline-block w-[7px] h-[13px] ml-0.5 align-middle bg-[#2F9E6E]/70 animate-pulse rounded-[1px]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 flex flex-col gap-1.5">
                {SUGGESTED.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="flex items-center justify-between text-left text-[12px] text-[#555] bg-[#F4FBF7] hover:bg-[#E0F3EA] border border-[rgba(47,158,110,0.12)] rounded-xl px-3.5 py-2.5 transition-colors duration-200"
                  >
                    {q}
                    <ArrowUpRight size={11} className="text-[#2F9E6E] flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 flex items-center gap-2 border-t border-[rgba(47,158,110,0.08)] pt-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="输入你的问题…"
                className="flex-1 text-[13px] bg-[#F4FBF7] border border-[rgba(47,158,110,0.12)] rounded-xl px-3.5 py-2 outline-none focus:border-[rgba(47,158,110,0.35)] transition-colors"
              />
              <button onClick={() => send(input)} className="w-8 h-8 rounded-xl bg-[#2F9E6E] flex items-center justify-center hover:bg-[#34D98C] transition-colors flex-shrink-0">
                <Send size={13} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Selected Work ────────────────────────────────────────────────────────────
const STATUS_STYLE = {
  "已上线": "bg-[#E8F5E9] text-[#2E7D32] border-[rgba(46,125,50,0.2)]",
  "开发中": "bg-[#FFF8E1] text-[#F57F17] border-[rgba(245,127,23,0.2)]",
  "Skill": "bg-[#2F9E6E]/15 text-[#2F9E6E] border-[rgba(79,193,140,0.30)]",
};

function ProjectCard({ p, i, onProjectClick }: { p: Project; i: number; onProjectClick: (p: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onProjectClick(p)}
      className={`group relative rounded-2xl overflow-hidden bg-white border border-gray-200 cursor-pointer hover:border-black/15 transition-all duration-300 ${p.span}`}
    >
      {/* Cover image */}
      <div className={`relative overflow-hidden ${p.imgAspect}`}>
        <img src={p.img} alt={p.title} style={{ objectPosition: p.imgPosition ?? "center" }} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />

        {/* Status badge — top left */}
        <div className="absolute top-4 left-4">
          <span className={`font-mono text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${STATUS_STYLE[p.status]}`}>
            {p.status}
          </span>
        </div>

        {/* Arrow — top right on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md">
            <ArrowUpRight size={13} className="text-[#2F9E6E]" />
          </div>
        </div>

        {/* Bottom overlay — subtitle code */}
        <div className="absolute bottom-4 left-4">
          <span className="font-mono text-[9px] tracking-[0.1em] text-[#888888]">{p.subtitle}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#2F9E6E]">{p.cat}</span>
          <span className="font-mono text-[9px] tracking-[0.1em] text-[#888888]">{p.year}</span>
        </div>
        <h3 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] text-base md:text-lg leading-snug mb-2">
          {p.title}
        </h3>
        <p className="text-[#555555] text-xs leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "DM Sans, sans-serif" }}>{p.desc}</p>
        <div className="flex items-center gap-1.5 text-[#2F9E6E] group-hover:gap-2.5 transition-all duration-300">
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase">查看详情</span>
          <ChevronRight size={11} />
        </div>
      </div>
    </motion.div>
  );
}

function SelectedWork({ onProjectClick }: { onProjectClick: (p: Project) => void }) {
  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 4);

  return (
    <Reveal id="work" className="py-24 md:py-32 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgMelon} grainId="grain-work" caption="好奇心，是创造的起点"
        opacity={0.65} overlay={0.42}
        filterCss="brightness(0.92) saturate(0.55) contrast(1.08)"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SLabel n="03" label="Vibe Coding · 精选项目" />
        <h2 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          从需求出发，<em className="italic text-[#2F9E6E]">快速做出来。</em>
        </h2>
        <p className="text-[#555555] text-sm leading-relaxed mb-12 max-w-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
          1 个工具 · 很多 Skill，每一个都来自真实工作中遇到的具体问题
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {row1.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onProjectClick={onProjectClick} />
          ))}
          {row2.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i + 2} onProjectClick={onProjectClick} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "AI / Product",
    items: ["AI 产品设计", "对话体验设计", "智能体产品", "Prompt Engineering", "MCP / RAG / SFT", "策略优化", "评测体系搭建"],
  },
  {
    label: "Evaluation / Insight",
    items: ["评测集构建", "机评 / 人评", "Query 洞察", "Badcase 分析", "全链路数据埋点", "指标拆解"],
  },
  {
    label: "Data / Build",
    items: ["SQL · Python", "Excel · Tableau · Power BI", "Figma · Axure · UML", "Java 前后端开发", "微信小程序", "Vibe Coding"],
  },
];

function Skills() {
  return (
    <Reveal id="skills" className="py-24 md:py-32 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgTarot} grainId="grain-skills" caption="扎实，是一切能力的前提"
        opacity={0.65} overlay={0.40}
        filterCss="brightness(0.82) saturate(0.70) contrast(1.05)"
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <SLabel n="04" label="能力组合" />
        <div className="mb-14">
          <h2 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            懂 AI 也懂产品<br />
            <em className="italic text-[#2F9E6E]">也能推动落地</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-0">
          {skillGroups.map((group, i) => (
            <motion.div key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 border-t border-gray-200 md:border-l first:md:border-l-0 hover:bg-white/70 transition-colors duration-400"
            >
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#2F9E6E] mb-6">{group.label}</div>
              <ul className="space-y-3">
                {group.items.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-[#3A3A3A]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    <div className="w-1 h-1 rounded-full bg-[#2F9E6E]/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ─── About / Off the Clock ────────────────────────────────────────────────────
function AboutMe() {
  return (
    <Reveal id="hobby" className="py-24 md:py-32 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgDance} grainId="grain-about" caption="舞台教会我节奏，也教会我当下"
        opacity={0.68} overlay={0.38}
        filterCss="brightness(0.78) saturate(0.68) contrast(1.06)"
      />
      <div className="absolute pointer-events-none" style={{ width: "45%", height: "60%", bottom: "-10%", right: "-10%", background: "radial-gradient(ellipse at 60% 70%, rgba(79,193,140,0.06) 0%, transparent 70%)", filter: "blur(70px)" }} aria-hidden />

      <div className="max-w-6xl mx-auto relative z-10">
        <SLabel n="05" label="工作与学习之外的我" />

        <div className="grid md:grid-cols-[1fr_1.8fr] gap-10 md:gap-16 items-start">
          <div>
            <h2 className="font-['Playfair_Display'] font-bold text-[#1A1A1A] mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              专业之外<br />
              <em className="italic text-[#2F9E6E]">还有舞台</em>
            </h2>
            <p className="text-[#4D4D4D] text-sm leading-relaxed mb-5" style={{ fontFamily: "DM Sans, sans-serif" }}>
              曾任清华大学 DK5s 街舞社社长、艺术团街舞队队长。任内课程体量增长 1.6 倍，全年开课 150+ 场、覆盖 8 大舞种、服务 6400+ 人次；以总导演与总策划的身份操办社团 10 周年专场《拾光之旅》——筹备近一年，集结 104 名演员，吸引 900+ 观众，这也是建社以来首场专场演出。
            </p>
            <p className="text-[#4D4D4D] text-sm leading-relaxed mb-8" style={{ fontFamily: "DM Sans, sans-serif" }}>
              舞台让我理解节奏、现场感和团队协作。这些东西渗透进了我做产品的方式里——对节奏的把控，对细节的执行，和在不确定中保持清醒。
            </p>
            <p className="text-[#4D4D4D] text-sm leading-relaxed mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
              街舞社原创 MV《青春赞歌》由我担任导演与制片，完整体验了「把一个想法做成作品」的全过程，抖音收获 20w+ 播放与 3.3w+ 点赞。
            </p>
            <a
              href="https://v.douyin.com/ygR0MP57rtY/"
              target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-white bg-[#2F9E6E] rounded-full px-5 py-2.5 mb-8 hover:bg-[#34D98C] transition-all duration-300"
            >
              <Play size={13} className="fill-current" />
              观看抖音作品《青春赞歌》
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Music size={13} />, label: "街舞 · 舞台表演" },
                { icon: <Trophy size={13} />, label: "多次高校冠军" },
                { icon: <Clapperboard size={13} />, label: "专场演出总导演" },
                { icon: <Users size={13} />, label: "300 人社群运营" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-xs text-[#555555]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  <span className="text-[#2F9E6E] flex-shrink-0">{icon}</span>{label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-[180px_180px_180px] gap-3">
            {[
              { src: clubDirector, alt: "街舞社专场大合影", label: "大合影", cls: "col-span-2 row-span-1" },
              { src: clubNew1, alt: "紫色衣服赛场图", label: "赛场特写", cls: "col-span-1 row-span-1" },
              { src: clubNew2, alt: "演出瞬间", label: "演出瞬间", cls: "col-span-1 row-span-1" },
              { src: clubAigc, alt: "用 AIGC 工具制作专场物料", label: "AIGC 物料", cls: "col-span-2 row-span-2" },
              { src: clubTsinghua, alt: "清华演出", label: "清华演出", cls: "col-span-1 row-span-1" },
              { src: clubNew3, alt: "原创活动", label: "原创活动", cls: "col-span-1 row-span-1" },
              { src: clubAward, alt: "五星级社团", label: "五星社团", cls: "col-span-1 row-span-1" },
              { src: clubNew4, alt: "现场表演", label: "现场表演", cls: "col-span-1 row-span-1" },
            ].map(({ src, alt, label, cls }) => (
              <div key={label} className={`${cls} rounded-2xl overflow-hidden group bg-[#E5F3EC] relative`}>
                <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-[#666666]">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <Reveal id="contact" className="py-28 md:py-40 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgZen} grainId="grain-contact" caption="每一次连接，都从专注开始"
        opacity={0.65} overlay={0.48}
        filterCss="brightness(1.65) saturate(0.35) contrast(0.90)"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 65% at 50% 85%, rgba(47,158,110,0.22) 0%, transparent 70%)" }} aria-hidden />
      <div className="absolute pointer-events-none" style={{ width: "40%", height: "40%", top: "18%", left: "30%", background: "radial-gradient(ellipse at 50% 50%, rgba(201,196,154,0.13) 0%, transparent 70%)", filter: "blur(50px)" }} aria-hidden />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-10 bg-[#2F9E6E] opacity-60" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#1E9E66]">06 — 联系我</span>
          <div className="h-px w-10 bg-[#2F9E6E] opacity-60" />
        </div>

        <h2 className="font-['Playfair_Display'] font-black leading-tight text-[#1A1A1A] mb-6" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}>
          欢迎交流 AI 产品<br />
          <em className="italic text-[#1E9E66]">实习机会与合作可能</em>
        </h2>

        <div className="inline-block bg-[rgba(47,158,110,0.1)] border border-[rgba(47,158,110,0.25)] rounded-3xl p-8 mb-10 text-left w-full max-w-md">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "电子邮件", val: "luojing_rain02@163.com" },
              { icon: Phone, label: "电话", val: "18874032839" },
              { icon: MessageCircle, label: "微信", val: "A15581501619" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-[rgba(47,158,110,0.2)] flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-[#1E9E66]" />
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#555555] mb-0.5">{label}</div>
                  <div className="text-[#1A1A1A] text-sm" style={{ fontFamily: "DM Sans, sans-serif" }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Reveal>
  );
}

// ─── Easter Egg ────────────────────────────────────────────────────────────────
function EasterEgg() {
  return (
    <Reveal id="egg" className="min-h-screen flex items-center py-24 md:py-32 px-6 bg-[#FAFAF8] relative overflow-hidden">
      <BgLayer
        src={bgDog} grainId="grain-egg" caption="一起做有趣的人"
        opacity={0.65} overlay={0.38}
        filterCss="brightness(0.90) saturate(0.72) contrast(1.05)"
      />
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="text-center mb-12">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#1E9E66]">彩蛋</span>
          <h2 className="font-['Playfair_Display'] font-black text-[#1A1A1A] mt-4 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            感谢你看到这里
          </h2>
          <p className="text-[#4D4D4D] text-sm leading-relaxed mt-6 max-w-2xl mx-auto" style={{ fontFamily: "DM Sans, sans-serif" }}>
            本网站的所有背景图为老罗当前的人格九宫格，我的短期目标是寻找一个心仪的工作，长期目标是做一个有趣的人。所以，无论你是谁，欢迎添加联系方式，一起来做有趣的人~
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-white/85 backdrop-blur-md border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <img src={nineGridTemplate} alt="空白九宫格" className="w-full h-full object-cover" />
            <div className="py-3 text-center font-mono text-[9px] tracking-[0.2em] uppercase text-[#777777]">空白九宫格</div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-white/85 backdrop-blur-md border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <img src={nineGridMine} alt="老罗的人格九宫格" className="w-full h-full object-cover" />
            <div className="py-3 text-center font-mono text-[9px] tracking-[0.2em] uppercase text-[#777777]">老罗的人格九宫格</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-5 px-6 bg-[#F5F5F0] border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#AAAAAA]">罗静 — AI 产品经理 · 清华大学 27 届</span>
        <span className="font-mono text-[10px] text-[#AAAAAA]">© 2026</span>
      </div>
      <div className="max-w-7xl mx-auto mt-2 flex items-center justify-center">
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-[#AAAAAA] hover:text-[#666]"
        >
          ICP 备案号：京ICP备00000000号（备案通过后替换）
        </a>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // 初始状态直接读 URL（/?project=id），刷新或分享链接能直达详情页
  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    const pid = new URLSearchParams(window.location.search).get("project");
    return pid ? (projects.find(x => x.id === pid) ?? null) : null;
  });
  const [chatOpen, setChatOpen] = useState(false);

  // 监听浏览器前进/后退，URL 与详情页状态保持同步
  useEffect(() => {
    const syncFromUrl = () => {
      const pid = new URLSearchParams(window.location.search).get("project");
      setCurrentProject(pid ? (projects.find(x => x.id === pid) ?? null) : null);
      if (pid) window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const openProject = (p: Project) => {
    setCurrentProject(p);
    window.scrollTo(0, 0);
    const url = new URL(window.location.href);
    url.searchParams.set("project", p.id);
    window.history.pushState({ fromSite: true }, "", url);
  };

  const goHome = () => {
    if (window.history.state?.fromSite) {
      // 由站内 pushState 进入：走浏览器回退，popstate 会自动关闭详情页
      window.history.back();
    } else {
      // 直接加载带 project 参数的 URL：站内没有历史记录，原地替换回主页
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      window.history.replaceState(null, "", url);
      setCurrentProject(null);
      window.scrollTo(0, 0);
    }
  };

  if (currentProject) {
    return (
      <>
        <Grain />
        <ProjectPage project={currentProject} onBack={goHome} />
        <style>{`
          ::-webkit-scrollbar { width: 0; background: transparent; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </>
    );
  }

  return (
    <div className="bg-[#FAFAF8] antialiased" style={{ fontFamily: "DM Sans, sans-serif" }}>
      <Grain />
      <Nav />
      <main>
        <Hero onCopilotClick={() => setChatOpen(true)} />
        <Education />
        <InternshipMap />
        <Experience />
        <SelectedWork onProjectClick={openProject} />
        <Skills />
        <AboutMe />
        <Contact />
        <EasterEgg />
      </main>
      <Footer />
      <AnimatePresence>
        {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
