import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import Icon from "@/components/ui/icon";
import { GAMES } from "@/data/games";

const library = GAMES.slice(0, 3);

const ACHIEVEMENTS = [
  { icon: "Gamepad2", label: "Первая игра", desc: "Скачал первую игру", unlocked: true },
  { icon: "Flame", label: "На волне", desc: "3 игры за неделю", unlocked: true },
  { icon: "Star", label: "Критик", desc: "Оставил 10 отзывов", unlocked: false },
  { icon: "Package", label: "Коллекционер", desc: "25+ игр в библиотеке", unlocked: false },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--game-purple))] to-[hsl(var(--game-cyan))] flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Игрок_2077
              </h2>
              <p className="text-sm text-muted-foreground mb-5">Присоединился в 2024</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { v: "47", l: "Игр" },
                  { v: "128", l: "Часов" },
                  { v: "12", l: "Отзывов" },
                ].map((s) => (
                  <div key={s.l} className="bg-[hsl(var(--secondary))] rounded-lg p-3">
                    <div
                      className="text-lg font-bold gradient-text"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {s.v}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[hsl(var(--game-purple))] text-white hover:bg-[hsl(258,90%,72%)] transition-colors">
                Редактировать профиль
              </button>
            </div>

            <div className="rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] p-5">
              <h3
                className="text-base font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <Icon name="Trophy" size={16} className="text-yellow-400" />
                Достижения
              </h3>
              <div className="space-y-3">
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.label}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      a.unlocked
                        ? "border-[hsl(var(--game-purple))]/30 bg-[hsl(var(--game-purple))]/10"
                        : "border-[hsl(var(--game-border))] opacity-50"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        a.unlocked
                          ? "bg-[hsl(var(--game-purple))]/20"
                          : "bg-[hsl(var(--secondary))]"
                      }`}
                    >
                      <Icon
                        name={a.icon}
                        size={16}
                        className={a.unlocked ? "text-[hsl(var(--game-purple))]" : "text-muted-foreground"}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">{a.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{a.desc}</div>
                    </div>
                    {a.unlocked && (
                      <Icon name="Check" size={14} className="text-[hsl(var(--game-cyan))] shrink-0 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] p-5">
              <h3
                className="text-base font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <Icon name="Library" size={16} className="text-[hsl(var(--game-cyan))]" />
                Моя библиотека
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {library.length} игр
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {library.map((game) => (
                  <GameCard key={game.id} game={game} size="sm" />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] p-5">
              <h3
                className="text-base font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                <Icon name="Activity" size={16} className="text-[hsl(var(--game-pink))]" />
                Активность
              </h3>
              <div className="space-y-3">
                {[
                  { action: "Скачал", game: "Cyberpunk 2099", time: "2 часа назад", icon: "Download" },
                  { action: "Оценил", game: "Eternal Quest", time: "Вчера", icon: "Star" },
                  { action: "Скачал", game: "Warfront: Omega", time: "3 дня назад", icon: "Download" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 border-b border-[hsl(var(--game-border))] last:border-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--secondary))] flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={14} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-muted-foreground">{item.action} </span>
                      <span className="text-sm font-medium text-foreground">{item.game}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
