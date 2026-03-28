import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useGames } from "@/context/GamesContext";
import { GENRES } from "@/data/games";

const EMPTY_FORM = {
  title: "",
  genre: "RPG",
  downloadUrl: "",
  imageUrl: "",
  imageFile: null as File | null,
  imagePreview: "",
  size: "",
  description: "",
  rating: "4.5",
  platform: [] as string[],
  isNew: true,
  isFeatured: false,
};

const PLATFORMS = ["PC", "PS5", "Xbox", "Mobile"];
const GAME_GENRES = GENRES.filter((g) => g !== "Все");

export default function Admin() {
  const { games, addGame, deleteGame } = useGames();
  const [form, setForm] = useState(EMPTY_FORM);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<"add" | "list">("add");
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Введите название";
    if (!form.downloadUrl.trim()) e.downloadUrl = "Введите ссылку на скачивание";
    if (!form.imagePreview && !form.imageUrl.trim()) e.image = "Добавьте иконку игры";
    return e;
  };

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((f) => ({
        ...f,
        imageFile: file,
        imagePreview: e.target?.result as string,
        imageUrl: "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageFile(file);
  };

  const togglePlatform = (p: string) => {
    setForm((f) => ({
      ...f,
      platform: f.platform.includes(p)
        ? f.platform.filter((x) => x !== p)
        : [...f.platform, p],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    addGame({
      title: form.title.trim(),
      genre: form.genre,
      image: form.imagePreview || form.imageUrl.trim(),
      size: form.size || "N/A",
      description: form.description.trim() || "Нет описания",
      rating: parseFloat(form.rating) || 4.5,
      downloads: 0,
      platform: form.platform.length > 0 ? form.platform : ["PC"],
      releaseYear: new Date().getFullYear(),
      isNew: form.isNew,
      isFeatured: form.isFeatured,
      downloadUrl: form.downloadUrl.trim(),
    } as Parameters<typeof addGame>[0]);

    setForm(EMPTY_FORM);
    setSuccess(true);
    setTab("list");
    setTimeout(() => setSuccess(false), 3000);
  };

  const field = (label: string, key: keyof typeof EMPTY_FORM, placeholder: string, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl bg-[hsl(var(--secondary))] border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-[hsl(var(--game-purple))] ${
          errors[key] ? "border-red-500/60" : "border-[hsl(var(--game-border))]"
        }`}
      />
      {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--game-border))] bg-[hsl(220,20%,6%)]/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--game-purple))] to-[hsl(var(--game-cyan))] flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-base" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Админ-панель
              </span>
              <span className="text-muted-foreground text-sm ml-2">СайтоИгр</span>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            На сайт
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {success && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm">
            <Icon name="CheckCircle" size={18} />
            Игра успешно добавлена и доступна на сайте!
          </div>
        )}

        <div className="flex gap-2 mb-8 p-1 bg-[hsl(var(--game-card))] border border-[hsl(var(--game-border))] rounded-xl w-fit">
          {(["add", "list"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                tab === t
                  ? "bg-[hsl(var(--game-purple))] text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={t === "add" ? "Plus" : "List"} size={15} />
              {t === "add" ? "Добавить игру" : `Все игры (${games.length})`}
            </button>
          ))}
        </div>

        {tab === "add" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div className="p-5 rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] space-y-4">
                  <h2 className="font-bold text-base flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    <Icon name="Info" size={16} className="text-[hsl(var(--game-purple))]" />
                    Основная информация
                  </h2>

                  {field("Название игры *", "title", "Например: Cyberpunk 2099")}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Жанр</label>
                    <div className="flex flex-wrap gap-2">
                      {GAME_GENRES.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, genre: g }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            form.genre === g
                              ? "bg-[hsl(var(--game-purple))]/25 text-[hsl(var(--game-purple))] border border-[hsl(var(--game-purple))]/40"
                              : "bg-[hsl(var(--secondary))] text-muted-foreground border border-[hsl(var(--game-border))] hover:text-foreground"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {field("Описание", "description", "Краткое описание игры...")}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Размер</label>
                      <input
                        value={form.size}
                        onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                        placeholder="Например: 45 GB"
                        className="w-full px-3 py-2.5 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--game-border))] text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[hsl(var(--game-purple))] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Рейтинг</label>
                      <select
                        value={form.rating}
                        onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--game-border))] text-sm text-foreground outline-none focus:border-[hsl(var(--game-purple))] transition-colors"
                      >
                        {["5.0","4.9","4.8","4.7","4.6","4.5","4.4","4.3","4.2","4.1","4.0","3.5","3.0"].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Платформы</label>
                    <div className="flex gap-2 flex-wrap">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => togglePlatform(p)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                            form.platform.includes(p)
                              ? "bg-[hsl(var(--game-cyan))]/20 text-[hsl(var(--game-cyan))] border-[hsl(var(--game-cyan))]/40"
                              : "bg-[hsl(var(--secondary))] text-muted-foreground border-[hsl(var(--game-border))] hover:text-foreground"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        onClick={() => setForm((f) => ({ ...f, isNew: !f.isNew }))}
                        className={`w-10 h-5 rounded-full transition-colors relative ${form.isNew ? "bg-[hsl(var(--game-cyan))]" : "bg-[hsl(var(--secondary))]"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.isNew ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">Новинка</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))}
                        className={`w-10 h-5 rounded-full transition-colors relative ${form.isFeatured ? "bg-[hsl(var(--game-purple))]" : "bg-[hsl(var(--secondary))]"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.isFeatured ? "translate-x-5" : "translate-x-0.5"}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">На главной</span>
                    </label>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] space-y-4">
                  <h2 className="font-bold text-base flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    <Icon name="Link" size={16} className="text-[hsl(var(--game-cyan))]" />
                    Ссылка на скачивание
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Ссылка *
                    </label>
                    <input
                      value={form.downloadUrl}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, downloadUrl: e.target.value }));
                        if (errors.downloadUrl) setErrors((e) => ({ ...e, downloadUrl: "" }));
                      }}
                      placeholder="https://..."
                      className={`w-full px-3 py-2.5 rounded-xl bg-[hsl(var(--secondary))] border text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-[hsl(var(--game-purple))] ${
                        errors.downloadUrl ? "border-red-500/60" : "border-[hsl(var(--game-border))]"
                      }`}
                    />
                    {errors.downloadUrl && <p className="text-xs text-red-400 mt-1">{errors.downloadUrl}</p>}
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Ссылка куда отправится пользователь при нажатии «Скачать»
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-5 rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] space-y-4">
                  <h2 className="font-bold text-base flex items-center gap-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    <Icon name="Image" size={16} className="text-[hsl(var(--game-pink))]" />
                    Иконка / обложка игры *
                  </h2>

                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => !form.imagePreview && fileRef.current?.click()}
                    className={`relative rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
                      form.imagePreview
                        ? "border-[hsl(var(--game-purple))]/40 p-0 overflow-hidden"
                        : "border-[hsl(var(--game-border))] hover:border-[hsl(var(--game-purple))]/50 p-8 flex flex-col items-center justify-center gap-3"
                    } ${errors.image ? "border-red-500/50" : ""}`}
                  >
                    {form.imagePreview ? (
                      <div className="relative group">
                        <img
                          src={form.imagePreview}
                          alt="preview"
                          className="w-full h-52 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                            className="px-3 py-2 rounded-lg bg-white/20 text-white text-xs font-medium hover:bg-white/30 transition-colors flex items-center gap-1"
                          >
                            <Icon name="RefreshCw" size={13} /> Заменить
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, imagePreview: "", imageFile: null })); }}
                            className="px-3 py-2 rounded-lg bg-red-500/30 text-white text-xs font-medium hover:bg-red-500/50 transition-colors flex items-center gap-1"
                          >
                            <Icon name="Trash2" size={13} /> Удалить
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-xl bg-[hsl(var(--game-purple))]/15 flex items-center justify-center">
                          <Icon name="Upload" size={24} className="text-[hsl(var(--game-purple))]" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">Загрузить изображение</p>
                          <p className="text-xs text-muted-foreground mt-1">Перетащи или нажми • PNG, JPG, WEBP</p>
                        </div>
                      </>
                    )}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageFile(file);
                      if (errors.image) setErrors((er) => ({ ...er, image: "" }));
                    }}
                  />

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                      <span className="text-xs text-muted-foreground">или URL:</span>
                    </div>
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, imageUrl: e.target.value, imagePreview: "", imageFile: null }));
                        if (errors.image) setErrors((er) => ({ ...er, image: "" }));
                      }}
                      placeholder="https://example.com/game.jpg"
                      className="w-full pl-16 pr-3 py-2.5 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--game-border))] text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-[hsl(var(--game-purple))] transition-colors"
                    />
                  </div>

                  {form.imageUrl && !form.imagePreview && (
                    <div className="rounded-xl overflow-hidden border border-[hsl(var(--game-border))]">
                      <img src={form.imageUrl} alt="preview" className="w-full h-40 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                    </div>
                  )}

                  {errors.image && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} /> {errors.image}
                    </p>
                  )}
                </div>

                <div className="p-5 rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))]">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Предпросмотр карточки</h3>
                  <div className="rounded-xl overflow-hidden border border-[hsl(var(--game-border))] bg-[hsl(220,20%,8%)]">
                    <div className="relative h-32 bg-[hsl(var(--secondary))]">
                      {(form.imagePreview || form.imageUrl) ? (
                        <img
                          src={form.imagePreview || form.imageUrl}
                          alt="preview"
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="Image" size={32} className="text-muted-foreground opacity-30" />
                        </div>
                      )}
                      {form.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-[hsl(var(--game-cyan))] text-[hsl(var(--game-dark))]">
                          NEW
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-base text-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {form.title || "Название игры"}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="px-2 py-0.5 rounded text-xs bg-[hsl(var(--game-purple))]/20 text-[hsl(var(--game-purple))]">
                          {form.genre}
                        </span>
                        <span className="text-xs text-muted-foreground">{form.size || "— GB"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-[hsl(var(--game-purple))] text-white hover:bg-[hsl(258,90%,72%)] transition-colors"
              >
                <Icon name="Plus" size={18} />
                Добавить игру
              </button>
              <button
                type="button"
                onClick={() => setForm(EMPTY_FORM)}
                className="px-6 py-3 rounded-xl font-medium border border-[hsl(var(--game-border))] text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--secondary))] transition-colors"
              >
                Очистить
              </button>
            </div>
          </form>
        )}

        {tab === "list" && (
          <div className="space-y-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-[hsl(var(--game-border))] bg-[hsl(var(--game-card))] hover:border-[hsl(var(--game-purple))]/30 transition-colors"
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-16 h-12 rounded-lg object-cover shrink-0 border border-[hsl(var(--game-border))]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground truncate" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {game.title}
                    </span>
                    {game.isNew && (
                      <span className="px-1.5 py-0.5 rounded text-xs bg-[hsl(var(--game-cyan))]/20 text-[hsl(var(--game-cyan))]">
                        NEW
                      </span>
                    )}
                    {game.isFeatured && (
                      <span className="px-1.5 py-0.5 rounded text-xs bg-[hsl(var(--game-purple))]/20 text-[hsl(var(--game-purple))]">
                        На главной
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                    <span>{game.genre}</span>
                    <span>·</span>
                    <span>{game.size}</span>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={10} className="text-yellow-400 fill-yellow-400" />
                      <span>{game.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteGame(game.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
                  title="Удалить игру"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
