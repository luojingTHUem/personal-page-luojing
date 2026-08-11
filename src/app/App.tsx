import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail, Phone, MapPin, ChevronRight, X, Minus, Send, ArrowLeft, Music, Trophy, Clapperboard, Users, Bot, Play, MessageCircle } from "lucide-react";
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
import clubDirectorLeft from "@/imports/clubDirectorLeft.jpg";
import clubTsinghua from "@/imports/clubTsinghua.jpg";
import clubAward from "@/imports/clubAward.jpg";
import clubNew1 from "@/imports/clubNew1.jpg";
import clubNew2 from "@/imports/clubNew2.jpg";
import clubNew3 from "@/imports/clubNew3.jpg";
import clubNew4 from "@/imports/clubNew4.jpg";
import nineGridTemplate from "@/imports/nineGridTemplate.jpg";
import nineGridMine from "@/imports/nineGridMine.jpg";

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
            <p>我希望能做大众真正愿意用的 AI 产品。过去先后在蚂蚁支付宝、字节飞书、腾讯 IEG、平安科技参与消息速览、企业知识问答、游戏 AI 玩法与销辅机器人等不同项目，不断体会 AI 能力是如何在真实业务链路里产生价值的。</p>
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
    sub: "Open Fiesta | 互联网＋创新设计方向",
    logo: tsinghuaLogo,
    logoBg: "#F8F4FA",
    items: ["产品设计与开发", "机器学习与强化学习", "人工智能前沿", "社会创新设计 · 交叉学科前沿"],
  },
  {
    period: "2020.09 — 2024.06",
    school: "中南大学",
    major: "信息管理与信息系统",
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
              <p className="text-[#4D4D4D] text-sm mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{card.major}</p>
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
    summary: "同时负责 to C 的支付宝消息速览工具改版，以及 to B 的消息平台智能问答机器人从零搭建，涵盖产品改版、Prompt 开发、评测体系与知识图谱构建。",
    bullets: [
      { label: "项目一 · 支付宝消息速览（to C）", text: "结合 8 场线下用研与线上数据，重新梳理八大消息场景（资金变动、财富收益、快递、行程、医疗、生活服务、安全、权益）与业务规则；主导主页面改版、入口优化、后台管理平台三部分，其中主页面改版已于 8 月底上线。" },
      { label: "Prompt 开发与评测链路", text: "独立输出 7 个提示词至可上线版本；从 0 到 1 重构端到端评测链路与评价指标，协助研发完成基座模型能力评估与选型；输出《AI 产品评测方法论与操作手册》，同步上线评测 Skill，显著提升团队评测优化效率。" },
      { label: "项目二 · 消息平台智能问答机器人（to B）", text: "消息平台知识分散在代码、文档等各处，咨询效率低、重复性问题多；设计三层知识结构（L1 业务语义层 → L2 代码层 + mapping 映射 → L3 操作 SOP），接入代码、语雀知识库、数据表等四类知识来源；当前 Know 类基础咨询完成度 88%，Do 类执行咨询完成度 65%；已打通 Dataphin CLI 链路，实现周报数据汇报与常规数据下钻洞察。" },
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
      { label: "功能交互类需求", text: "独立负责/核心参与 3 项交互型需求的方案设计与推进，具备从轻立项—评审—开发—联调—测试—GA 的完整经验；其中「全点位新增安全盾牌标识」峰值日点击 1.4w，「主对话支持双选答案」点击率 40%+，「输入框支持 @文档/群组」DAU 为大盘 2.15%。" },
      { label: "策略优化与评测", text: "熟悉对话类产品检索到生成的完整技术框架，搭建包括 Scan 深度检索、划词改写、多轮对话、语言判断、数字编码召回、季度 300Q、语种识别在内的多类评测集；熟练掌握从线上洞察—维度拆解—评测集构建—端到端机评/人评的策略优化与评测链路。" },
      { label: "数据洞察", text: "基于 20 万条线上 Query 独立撰写 prompt，输出《2025 年四季度线上 Query 洞察》报告，重点梳理用户整体意图，并对操作执行、写作、生图等场景及能力短板专项洞察；推动 Query 意图分类体系建设并实现全链路线上埋点，使季度洞察效率提升 70%，并沉淀为后续季度分析的标准方法。" },
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
      { label: "元梦之星 · AI 评论", text: "作为产品负责人输出需求文档、搭建人设 Prompt 及安全审核机制，保障评论合规性与拟人化效果；打通数据链路，实现外包人工截图→安全审核图的迁移；共四期优化，终期实现 95%+ 的评论满意度。" },
      { label: "NBA 球星评论分类", text: "结合虎扑爬虫、游戏数值、评论原声等多源数据，梳理分类规则与效果优化，推动项目上线，最终实现 95% 的分类准确率。" },
      { label: "剑侠情缘 · AIGC 角色生图", text: "负责玩法与生图方案设计，围绕个性、境界、主灵根、出身四个维度搭建选项解析、Prompt 映射与差异化提示词体系。" },
      { label: "内部平台调研", text: "完成 Coze、腾讯元器、蜘蛛智能体工坊的竞品分析，输出功能对比报告，梳理「小智」平台迭代计划；参与美术平台「三谦」用户研究，输出问卷、需求洞察报告与原画师提效报告。" },
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
      { label: "智小安 · 车险续保机器人（to C）", text: "跟进各版本需求，如产品解读、异议处理流程、一人名下多车、超级产品等功能；协助梳理业务流程、编写 PRD，维护需求池，补充原型样例，计算版本人力饱和度等；对意图识别、异议处理等子模型下发数据标注任务，与工程、算法对接，确保需求高效落地。已接入 11 款非车产品，二期已在浙江地区全面面客。" },
      { label: "直通 · 电话销售座席销辅机器人（to B）", text: "独立完成 20 余次标注任务下发，包括编写标准、中间控制、Badcase 结果回收与统计，整理优化建议并跟踪算法优化进展；从意图理解、上下文语义、问答匹配度等维度对蚂小财、度晓保、懂保保进行竞品调研；梳理保险销售的服销期、销售期、兜底期各节点的实现情况，整理后续优化方向。" },
      { label: "成果", text: "已向上海、重庆的 6000+ 座席试用，试点组策略采纳率达 70%，非车协销率较对照组提升 20%，最终面向 2 万座席全面开放。" },
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
      { label: "数据分析", text: "负责空调产品线销售数据整理与多维度汇总，使用 Excel 与 Python（pandas）支持周报/月报产出；参与竞品市场分析，输出功能对比报告，为产品定价策略提供数据支撑。" },
    ],
    tags: ["数据分析", "Python · Excel", "竞品分析", "商业智能"],
    img: mideaExp,
    imgAlt: "美的集团 · 数据分析实习",
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

              <div className={`group relative rounded-xl overflow-hidden aspect-[16/10] bg-[#EAF4EE] ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <img src={exp.img} alt={exp.imgAlt} className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700" />
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
}

const projects: Project[] = [
  {
    id: "diary",
    cat: "工具 · 实习记录",
    year: "2026",
    title: "高效工作助手",
    subtitle: "work-diary",
    desc: "个人高效工作追踪系统：自动汇聚语雀、钉钉、CodeFuse 等工作碎片，用 AI 总结产出、提取待办、生成周报月报与汇报材料。",
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
    fullDesc: "评测集构建是 AI 产品中最耗时也最容易出错的环节之一。这个 Skill 遵循无偏、真实、迭代、渐进四大设计原则，支持输入需求背景、会议纪要、线上日志、PRD 等多种材料，自动完成需求澄清、追问机制、维度拆解，最终生成结构化的语雀需求文档和带 13 列标准字段的钉钉多维表格。在飞书和蚂蚁实习期间持续使用，已沉淀为标准化工作流。",
    whyDesign: "每次搭建评测集都要重复同样的步骤：拆解需求 → 定义维度 → 设计测试用例 → 整理文档。这些步骤有规律可循，却消耗大量时间。把它做成 Skill，让模型帮我完成模板化的部分，我只需要关注关键判断。",
    highlights: ["多格式需求输入（文本 / 纪要 / 听记 / 线上数据 / PRD）", "自动拆解评测维度与示例 Case", "输出语雀文档 + 钉钉多维表格（13 列标准字段）", "沉淀无偏、真实、迭代、渐进的评测原则"],
    mockupImg: eval1,
    gallery: [eval1, eval2, eval3, eval4, eval5, eval6],
  },
  {
    id: "card",
    cat: "Skill · 内容设计",
    year: "2026",
    title: "AI 产品宣传卡片",
    subtitle: "skill-promo-card",
    desc: "基于「归藏风 Swiss International」风格系统，把 AI 产品能力生成为小红书 / 公众号可用的可视化宣传卡片 HTML。",
    img: IMGS.dash3, span: "md:col-span-1", imgAspect: "aspect-[4/3]",
    status: "Skill",
    tags: ["内容设计", "Swiss Style", "小红书", "Claude Skill"],
    fullDesc: "AI 产品的能力往往难以用文字直接传递。这个 Skill 以「归藏风 Swiss International」排版系统为基础，将产品功能点、数据指标、使用场景等信息转化为具有视觉张力的单文件 HTML 卡片，可直接截图用于小红书、公众号等社交平台传播。风格统一、无需设计工具，输入描述即可输出可用素材。",
    whyDesign: "做了好的产品，也需要让更多人看到。但设计宣传素材的成本通常很高——要开 Figma、调样式、对齐字体。把它做成 Skill 之后，写一段描述就能出一张卡，大幅降低内容创作的门槛。",
    highlights: ["归藏风 Swiss International 排版系统", "一键输出可截图 HTML 宣传卡", "支持小红书 / 公众号等多平台尺寸", "风格统一，无需设计工具"],
    mockupImg: IMGS.dash3,
    gallery: [IMGS.dash3],
  },
  {
    id: "proto",
    cat: "Skill · 原型",
    year: "2026",
    title: "原型转交互 Demo",
    subtitle: "prototype-to-demo",
    desc: "把 Figma / Axure / 手绘 / 截图等原型，通过 6 步工作流生产为可分享的单文件 HTML Demo，实测 97.5% 还原度。对外展示最多的 Skill。",
    img: protoCover, span: "md:col-span-1", imgAspect: "aspect-[4/3]", imgPosition: "top",
    status: "Skill",
    tags: ["原型还原", "HTML Demo", "像素级验证", "Claude Skill"],
    fullDesc: "产品评审和用户测试中，静态原型图往往无法传达真实的交互感。这个 Skill 通过六步闭环（读原型与拆解动线 → 组件化搭建页面 → 资产分离与画布适配 → 实现自然交互 → 截图验证与视觉修正 → 打包与验收），将任意格式原型转化为可在浏览器中运行的单文件 HTML Demo。内置 20×20 网格像素级采样对比，实测 97.5% 还原度；单文件零依赖，拷贝到任何地方都能直接打开。",
    whyDesign: "评审会上放一个能点击的 Demo，比展示静态截图效果好 10 倍。但把原型图转成代码通常需要几个小时。六步工作流把这个时间压缩到几分钟，让每次评审都能有可交互的 Demo。",
    highlights: ["支持 Figma / Axure / 截图 / 手绘稿等多格式输入", "六步工作流端到端自动化", "20×20 网格像素级验证，实测 97.5% 还原度", "单文件 HTML 零依赖，分享即用"],
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
          <div className="rounded-2xl overflow-hidden bg-white aspect-[4/5] relative border border-gray-200">
            <img
              key={activeImg}
              src={gallery[activeImg]}
              alt={project.title}
              style={{ objectPosition: project.imgPosition ?? "center" }}
              className="w-full h-full object-cover"
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
const BOT_ANSWERS: Record<string, string> = {
  "她适合 AI 产品经理岗位吗？": "非常适合。罗静有蚂蚁、飞书、腾讯 IEG、平安四段 AI 产品实习经历，覆盖对话体验、评测体系、AIGC 玩法与销辅机器人等核心场景。同时在清华攻读电子信息专硕，技术背景扎实，可提前实习。",
  "她的评测体系经验是什么？": "她在飞书独立搭建了包括 Scan 深度检索、多轮对话、季度 300Q 等多类评测集；在蚂蚁主导重构消息速览评测链路，从数据采集到 Badcase 沉淀形成端到端闭环；在腾讯负责游戏 AI 评论满意度评测，四期优化后达 95%+。",
  "她做过哪些 AI 对话产品？": "主要包括：飞书企业知识问答（RAG 检索 + 生成）、蚂蚁消息速览智能体、腾讯 UGC 地图 AI 评论、平安车险续保对话机器人与电话销售座席销辅机器人，覆盖 to C 与 to B 的多个对话产品形态。",
  "可以提前实习吗？": "可以。罗静目前在清华大学读研，支持提前实习，可实习地点包括上海、深圳、广州、杭州等城市。联系方式：luojing_rain02@163.com / 18874032839。",
};

function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "你好！我是罗静的 AI 助手。你可以问我关于她的实习经历、技术能力或求职意向～" },
  ]);
  const [input, setInput] = useState("");
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, text };
    const botText = BOT_ANSWERS[text] ?? "这个问题我暂时还没有对应的答案～欢迎直接联系罗静：luojing_rain02@163.com";
    setMessages(prev => [...prev, userMsg, { role: "bot", text: botText }]);
    setInput("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
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
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#2F9E6E] text-white rounded-br-sm"
                      : "bg-[#E8F5EE] text-[#333] rounded-bl-sm"
                  }`}>{m.text}</div>
                </div>
              ))}
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
              曾任清华大学 DK5s 街舞社社长、艺术团街舞队队长。任内课程体量增长 1.6 倍，全年开课 150+ 场、覆盖 8 大舞种、服务 6400+ 人次；主持社团 10 周年专场《拾光之旅》——筹备近一年、集结 104 名演员、吸引 900+ 观众，是建社以来首次专场演出。
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

          <div className="grid grid-cols-4 grid-rows-[200px_170px_200px] gap-3">
            {[
              { src: clubDirectorLeft, alt: "专场大合影·左", label: "大合影", cls: "col-span-1 row-span-2" },
              { src: clubAigc, alt: "用 AIGC 工具制作专场物料", label: "AIGC 物料", cls: "col-span-2 row-span-2" },
              { src: clubNew1, alt: "专场现场", label: "现场特写", cls: "col-span-1 row-span-1" },
              { src: clubNew2, alt: "演出瞬间", label: "演出瞬间", cls: "col-span-1 row-span-1" },
              { src: clubTsinghua, alt: "清华演出", label: "清华演出", cls: "col-span-1 row-span-1" },
              { src: clubNew3, alt: "排练日常", label: "排练日常", cls: "col-span-1 row-span-1" },
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
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const goHome = () => {
    setCurrentProject(null);
    window.scrollTo(0, 0);
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
        <SelectedWork onProjectClick={setCurrentProject} />
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
