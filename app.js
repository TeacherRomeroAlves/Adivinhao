(function () {
  const QUESTION_LIMIT = 7;
  const DEFAULT_LANGUAGE = "pt-BR";

  const translations = {
    "pt-BR": {
      htmlLang: "pt-BR",
      heroKicker: "⚽ Jogo misterioso de futebol",
      heroCopy:
        "Descubra o jogador por quatro estatísticas de carreira, sete perguntas de sim ou não e uma dica sutil.",
      newGame: "🎲 Novo jogador",
      statsKicker: "📊 Perfil misterioso",
      statsTitle: "Totais da carreira",
      statLabels: {
        matches: "Jogos",
        assists: "Assistências",
        titles: "Títulos",
        goals: "Gols"
      },
      questionsUsed: "perguntas usadas",
      hintAvailable: "disponível",
      hintUsed: "usada",
      interactionKicker: "🕵️ Interrogue o mistério",
      interactionTitle: "Sim ou não",
      questionLabel: "Faça uma pergunta",
      questionPlaceholder: "Exemplo: Barcelona, careca, casado, camisa 10",
      askButton: "Perguntar",
      questionHelp:
        "O sistema aceita perguntas completas ou curtas, como clubes, país, posição, títulos, aparência, camisa, apelidos e vida pessoal.",
      hintButton: "💡 Usar dica",
      historyKicker: "🧩 Rastro das perguntas",
      historyTitle: "Seu caminho até aqui",
      historyEmpty:
        "Ainda não há perguntas. Comece por clubes, nacionalidade, títulos ou aparência.",
      finalKicker: "🏁 Resposta final",
      finalTitle: "QUEM É?",
      guessLabel: "Nome do jogador",
      guessPlaceholder: "Digite o nome do jogador",
      guessButton: "🔥 Cravar",
      shareButton: "📣 Compartilhar resultado",
      feedbackReady: "Novo desafio na tela. Pode começar até com uma palavra.",
      feedbackAskFirst: "Digite alguma pista ou pergunta primeiro.",
      feedbackNumber:
        "Mencione o número da camisa diretamente, como 'camisa 10' ou 'número 7'.",
      feedbackUnknown:
        "Ainda não consigo responder isso com precisão. Tente clube, país, posição, título, número, apelido ou aparência.",
      feedbackQuestionsDone:
        "As sete perguntas acabaram. Você ainda pode usar a dica e mandar seu palpite.",
      shareCopied: "Resumo copiado para a área de transferência.",
      shareDone: "Resultado compartilhado com sucesso.",
      shareUnavailable: "O compartilhamento não está disponível neste navegador.",
      answerYes: "Sim",
      answerNo: "Não",
      resultEmpty: "Digite um nome antes de enviar seu palpite.",
      resultWin: (name) => `ACERTOU. O jogador era ${name}.`,
      resultLose: (name) => `NÃO FOI DESSA VEZ. O jogador era ${name}.`,
      shareTitle: "Adivinhão",
      shareResultSolved: "Acertou",
      shareResultMissed: "Errou",
      shareResultProgress: "Em andamento",
      shareStats: "Estatísticas",
      shareHint: "Dica usada",
      shareResult: "Resultado",
      shareQuestions: "Caminho das perguntas",
      shareAnswer: "Resposta"
    },
    en: {
      htmlLang: "en",
      heroKicker: "⚽ Mystery football game",
      heroCopy:
        "Decode the player from four career stats, seven yes-or-no questions, and one subtle hint.",
      newGame: "🎲 New player",
      statsKicker: "📊 Mystery profile",
      statsTitle: "Career totals",
      statLabels: {
        matches: "Matches",
        assists: "Assists",
        titles: "Titles",
        goals: "Goals"
      },
      questionsUsed: "questions used",
      hintAvailable: "available",
      hintUsed: "used",
      interactionKicker: "🕵️ Interrogate the mystery",
      interactionTitle: "Yes or no",
      questionLabel: "Ask a question",
      questionPlaceholder: "Example: Barcelona, bald, married, number 10",
      askButton: "Ask",
      questionHelp:
        "The system accepts full questions or short prompts about clubs, country, position, titles, appearance, shirt numbers, nicknames, and personal life.",
      hintButton: "💡 Use hint",
      historyKicker: "🧩 Question trail",
      historyTitle: "Your path so far",
      historyEmpty:
        "No questions yet. Start with clubs, nationality, trophies, or appearance.",
      finalKicker: "🏁 Final answer",
      finalTitle: "WHO IS IT?",
      guessLabel: "Player name",
      guessPlaceholder: "Type the player's name",
      guessButton: "🔥 Lock it in",
      shareButton: "📣 Share result",
      feedbackReady: "A fresh challenge is ready. You can even start with one word.",
      feedbackAskFirst: "Type a clue or question first.",
      feedbackNumber:
        "Mention the shirt number directly, like 'number 10' or 'shirt 7'.",
      feedbackUnknown:
        "I can't answer that one precisely yet. Try club, country, position, title, shirt number, nickname, or appearance.",
      feedbackQuestionsDone:
        "All seven questions are gone. You can still use your hint, then make your guess.",
      shareCopied: "Share summary copied to the clipboard.",
      shareDone: "Shared successfully.",
      shareUnavailable: "Sharing is unavailable in this browser.",
      answerYes: "Yes",
      answerNo: "No",
      resultEmpty: "Type a player name before submitting your guess.",
      resultWin: (name) => `BULLSEYE. The player was ${name}.`,
      resultLose: (name) => `NOT THIS TIME. The player was ${name}.`,
      shareTitle: "Adivinhao",
      shareResultSolved: "Solved",
      shareResultMissed: "Missed",
      shareResultProgress: "In progress",
      shareStats: "Stats",
      shareHint: "Hint used",
      shareResult: "Result",
      shareQuestions: "Question path",
      shareAnswer: "Answer"
    }
  };

  const state = {
    player: null,
    questionsAsked: [],
    hintUsed: false,
    solved: false,
    language: DEFAULT_LANGUAGE
  };

  const statsGrid = document.getElementById("stats-grid");
  const questionCount = document.getElementById("question-count");
  const questionLimit = document.getElementById("question-limit");
  const hintStatus = document.getElementById("hint-status");
  const feedback = document.getElementById("feedback");
  const hintBox = document.getElementById("hint-box");
  const historyList = document.getElementById("history-list");
  const resultCard = document.getElementById("result-card");
  const questionForm = document.getElementById("question-form");
  const questionInput = document.getElementById("question-input");
  const guessForm = document.getElementById("guess-form");
  const guessInput = document.getElementById("guess-input");
  const hintButton = document.getElementById("hint-button");
  const newGameButton = document.getElementById("new-game");
  const shareButton = document.getElementById("share-game");
  const langButtons = document.querySelectorAll(".lang-button");
  const creatorLink = document.querySelector(".creator-line a");

  const copyTargets = {
    heroKicker: document.getElementById("hero-kicker"),
    heroCopy: document.getElementById("hero-copy"),
    statsKicker: document.getElementById("stats-kicker"),
    statsTitle: document.getElementById("stats-title"),
    interactionKicker: document.getElementById("interaction-kicker"),
    interactionTitle: document.getElementById("interaction-title"),
    questionLabel: document.getElementById("question-label"),
    askButton: document.getElementById("ask-button"),
    questionHelp: document.getElementById("question-help"),
    historyKicker: document.getElementById("history-kicker"),
    historyTitle: document.getElementById("history-title"),
    guessKicker: document.getElementById("guess-kicker"),
    guessTitle: document.getElementById("guess-title"),
    guessLabel: document.getElementById("guess-label"),
    guessButton: document.getElementById("guess-button"),
    questionsUsedLabel: document.getElementById("questions-used-label")
  };

  const statKeys = ["matches", "assists", "titles", "goals"];

  const retiredPlayers = new Set([
    "pele",
    "diego-maradona",
    "ronaldo-nazario",
    "romario",
    "rivaldo",
    "ronaldinho",
    "zlatan-ibrahimovic",
    "david-beckham",
    "andres-iniesta",
    "paolo-maldini",
    "xavi",
    "thierry-henry",
    "wayne-rooney",
    "kaka"
  ]);

  const conceptDefinitions = [
    {
      type: "retired",
      patterns: [
        "retired",
        "retire",
        "aposentado",
        "aposentou",
        "aposentar"
      ],
      test: (player) => retiredPlayers.has(player.id)
    },
    {
      type: "married",
      patterns: ["married", "casado", "casada", "wife", "esposa", "partner"],
      test: (player) => player.personalStatus === "married"
    },
    {
      type: "children",
      patterns: [
        "children",
        "child",
        "sons",
        "son",
        "kids",
        "filho",
        "filhos",
        "crian"
      ],
      test: (player) => Boolean(player.personalChildren)
    },
    {
      type: "captain",
      patterns: ["captain", "capitao", "capitão"],
      test: (player) => player.facts.traits.includes("captain")
    },
    {
      type: "bald",
      patterns: ["bald", "careca"],
      test: (player) => player.facts.hair.includes("bald")
    },
    {
      type: "beard",
      patterns: ["beard", "bearded", "barba", "barbudo", "goatee", "cavanhaque"],
      test: (player) =>
        player.facts.hair.includes("beard") ||
        player.facts.hair.includes("goatee") ||
        player.facts.traits.includes("bearded")
    },
    {
      type: "blond",
      patterns: ["blond", "blonde", "loiro"],
      test: (player) =>
        player.facts.hair.includes("blond hair") ||
        player.facts.hair.includes("blonde hair")
    },
    {
      type: "dark-hair",
      patterns: ["dark hair", "brown hair", "moreno", "castanho"],
      test: (player) =>
        player.facts.hair.includes("dark hair") ||
        player.facts.hair.includes("brown hair")
    },
    {
      type: "long-hair",
      patterns: ["long hair", "cabelo grande", "cabelo longo"],
      test: (player) => player.facts.hair.includes("long hair")
    },
    {
      type: "ponytail",
      patterns: ["ponytail", "rabo de cavalo"],
      test: (player) => player.facts.hair.includes("ponytail")
    },
    {
      type: "tattoo",
      patterns: ["tattoo", "tattooed", "tatuagem", "tatuado"],
      test: (player) => player.facts.traits.includes("tattooed")
    },
    {
      type: "left-footed",
      patterns: ["left foot", "left-footed", "canhoto"],
      test: (player) => player.facts.traits.includes("left-footed")
    },
    {
      type: "right-footed",
      patterns: ["right foot", "right-footed", "destro"],
      test: (player) => player.facts.traits.includes("right-footed")
    },
    {
      type: "tall",
      patterns: ["tall", "alto"],
      test: (player) => player.facts.traits.includes("tall")
    },
    {
      type: "short",
      patterns: ["short", "baixo"],
      test: (player) => player.facts.traits.includes("short")
    },
    {
      type: "fast",
      patterns: ["fast", "pace", "rapido", "rápido", "veloz"],
      test: (player) => player.facts.traits.includes("fast")
    },
    {
      type: "smiling",
      patterns: ["smile", "smiling", "sorriso", "sorridente"],
      test: (player) => player.facts.traits.includes("smiling")
    },
    {
      type: "one-club-man",
      patterns: ["one club", "one-club", "um clube", "one club man"],
      test: (player) => player.facts.traits.includes("one-club man")
    }
  ];

  const knownFactValues = buildKnownFactValues();

  function t() {
    return translations[state.language];
  }

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function pickRandomPlayer() {
    const index = Math.floor(Math.random() * window.PLAYER_POOL.length);
    return window.PLAYER_POOL[index];
  }

  function buildKnownFactValues() {
    const groups = [
      "clubs",
      "nationality",
      "position",
      "nicknames",
      "leagues",
      "achievements",
      "personal"
    ];
    const known = {};

    groups.forEach((group) => {
      known[group] = Array.from(
        new Set(
          window.PLAYER_POOL.flatMap((player) => player.facts[group] || []).map((value) =>
            normalize(value)
          )
        )
      );
    });

    return known;
  }

  function answerLabel(isYes) {
    return isYes ? t().answerYes : t().answerNo;
  }

  function anyPatternMatch(text, patterns) {
    return patterns.some((pattern) => text.includes(normalize(pattern)));
  }

  function renderStaticCopy() {
    const dict = t();
    document.documentElement.lang = dict.htmlLang;
    document.title = "Adivinhão";

    copyTargets.heroKicker.textContent = dict.heroKicker;
    copyTargets.heroCopy.textContent = dict.heroCopy;
    copyTargets.statsKicker.textContent = dict.statsKicker;
    copyTargets.statsTitle.textContent = dict.statsTitle;
    copyTargets.interactionKicker.textContent = dict.interactionKicker;
    copyTargets.interactionTitle.textContent = dict.interactionTitle;
    copyTargets.questionLabel.textContent = dict.questionLabel;
    copyTargets.askButton.textContent = dict.askButton;
    copyTargets.questionHelp.textContent = dict.questionHelp;
    copyTargets.historyKicker.textContent = dict.historyKicker;
    copyTargets.historyTitle.textContent = dict.historyTitle;
    copyTargets.guessKicker.textContent = dict.finalKicker;
    copyTargets.guessTitle.textContent = dict.finalTitle;
    copyTargets.guessLabel.textContent = dict.guessLabel;
    copyTargets.guessButton.textContent = dict.guessButton;
    copyTargets.questionsUsedLabel.textContent = dict.questionsUsed;
    newGameButton.textContent = dict.newGame;
    hintButton.textContent = dict.hintButton;
    shareButton.textContent = dict.shareButton;
    questionInput.placeholder = dict.questionPlaceholder;
    guessInput.placeholder = dict.guessPlaceholder;

    creatorLink.textContent = "Teacher Romero Alves";
    questionLimit.textContent = String(QUESTION_LIMIT);

    langButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === state.language);
    });
  }

  function renderStats() {
    const dict = t();
    statsGrid.innerHTML = "";

    statKeys.forEach((key) => {
      const tile = document.createElement("article");
      tile.className = "stat-tile";
      tile.innerHTML = `
        <span class="stat-label">${dict.statLabels[key]}</span>
        <strong class="stat-value">${state.player.stats[key]}</strong>
      `;
      statsGrid.appendChild(tile);
    });
  }

  function renderMeta() {
    questionCount.textContent = String(state.questionsAsked.length);
    hintStatus.textContent = state.hintUsed ? t().hintUsed : t().hintAvailable;
    hintButton.disabled = state.hintUsed || state.solved;
    questionInput.disabled = state.solved || state.questionsAsked.length >= QUESTION_LIMIT;
    questionForm.querySelector('button[type="submit"]').disabled =
      state.solved || state.questionsAsked.length >= QUESTION_LIMIT;
    guessInput.disabled = state.solved;
    guessForm.querySelector('button[type="submit"]').disabled = state.solved;
  }

  function renderHistory() {
    historyList.innerHTML = "";

    if (!state.questionsAsked.length) {
      const item = document.createElement("li");
      item.className = "history-empty";
      item.textContent = t().historyEmpty;
      historyList.appendChild(item);
      return;
    }

    state.questionsAsked.forEach((entry, index) => {
      const item = document.createElement("li");
      item.className = "history-item";
      item.innerHTML = `
        <span class="history-index">Q${index + 1}</span>
        <div>
          <p>${entry.question}</p>
          <strong>${entry.answer}</strong>
        </div>
      `;
      historyList.appendChild(item);
    });
  }

  function setFeedback(message, tone) {
    feedback.className = `feedback ${tone || ""}`.trim();
    feedback.textContent = message;
  }

  function setResult(message, tone) {
    resultCard.className = `result-card ${tone || ""}`.trim();
    resultCard.textContent = message;
    resultCard.classList.remove("hidden");
  }

  function firstMatchingValue(question, values) {
    return values.find((value) => question.includes(normalize(value)));
  }

  function matchCollections(question, player) {
    const groups = [
      "clubs",
      "nationality",
      "position",
      "nicknames",
      "leagues",
      "achievements",
      "personal"
    ];

    for (const group of groups) {
      const matched = firstMatchingValue(question, knownFactValues[group] || []);
      if (matched) {
        return answerLabel(
          (player.facts[group] || []).map((value) => normalize(value)).includes(matched)
        );
      }
    }

    return null;
  }

  function detectConcept(question, player) {
    for (const definition of conceptDefinitions) {
      if (anyPatternMatch(question, definition.patterns)) {
        return answerLabel(definition.test(player));
      }
    }

    return null;
  }

  function answerNumberQuestion(question, player) {
    if (!/(camisa|numero|número|shirt|number|jersey|\bno\b)/.test(question)) {
      return null;
    }

    const numberMatch = question.match(/\b\d+\b/);
    if (!numberMatch) {
      return { ok: false, message: t().feedbackNumber };
    }

    return {
      ok: true,
      answer: answerLabel(player.facts.shirtNumbers.includes(numberMatch[0]))
    };
  }

  function answerQuestion(rawQuestion) {
    const question = normalize(rawQuestion);

    if (!question) {
      return { ok: false, message: t().feedbackAskFirst };
    }

    const numberResponse = answerNumberQuestion(question, state.player);
    if (numberResponse) {
      return numberResponse;
    }

    const collectionAnswer = matchCollections(question, state.player);
    if (collectionAnswer) {
      return { ok: true, answer: collectionAnswer };
    }

    const conceptAnswer = detectConcept(question, state.player);
    if (conceptAnswer) {
      return { ok: true, answer: conceptAnswer };
    }

    const hairMatch = firstMatchingValue(question, state.player.facts.hair || []);
    if (hairMatch) {
      return { ok: true, answer: answerLabel(true) };
    }

    const traitMatch = firstMatchingValue(question, state.player.facts.traits || []);
    if (traitMatch) {
      return { ok: true, answer: answerLabel(true) };
    }

    const personalMatch = firstMatchingValue(question, state.player.facts.personal || []);
    if (personalMatch) {
      return { ok: true, answer: answerLabel(true) };
    }

    return { ok: false, message: t().feedbackUnknown };
  }

  function getLocalizedHint() {
    return state.language === "pt-BR" && state.player.hintPt
      ? state.player.hintPt
      : state.player.hint;
  }

  function handleQuestionSubmit(event) {
    event.preventDefault();

    if (state.questionsAsked.length >= QUESTION_LIMIT || state.solved) {
      return;
    }

    const rawQuestion = questionInput.value.trim();
    if (!rawQuestion) {
      setFeedback(t().feedbackAskFirst, "warning");
      return;
    }

    const response = answerQuestion(rawQuestion);
    if (!response.ok) {
      setFeedback(response.message, "warning");
      return;
    }

    state.questionsAsked.push({ question: rawQuestion, answer: response.answer });
    questionInput.value = "";
    setFeedback(
      response.answer,
      response.answer === t().answerYes ? "positive" : "negative"
    );
    renderHistory();
    renderMeta();

    if (state.questionsAsked.length >= QUESTION_LIMIT) {
      setFeedback(t().feedbackQuestionsDone, "warning");
    }
  }

  function handleHint() {
    if (state.hintUsed || state.solved) {
      return;
    }

    state.hintUsed = true;
    hintBox.textContent = getLocalizedHint();
    hintBox.classList.remove("hidden");
    renderMeta();
  }

  function guessesMatch(guess, playerName) {
    return normalize(guess) === normalize(playerName);
  }

  function handleGuessSubmit(event) {
    event.preventDefault();
    const guess = guessInput.value.trim();

    if (!guess) {
      setResult(t().resultEmpty, "warning");
      return;
    }

    state.solved = true;
    renderMeta();

    if (guessesMatch(guess, state.player.name)) {
      setResult(t().resultWin(state.player.name), "success");
    } else {
      setResult(t().resultLose(state.player.name), "failure");
    }
  }

  function buildShareText() {
    const dict = t();
    const lines = [
      dict.shareTitle,
      `${dict.shareStats}: ${dict.statLabels.matches} ${state.player.stats.matches}, ${dict.statLabels.assists} ${state.player.stats.assists}, ${dict.statLabels.titles} ${state.player.stats.titles}, ${dict.statLabels.goals} ${state.player.stats.goals}`,
      `${dict.shareHint}: ${state.hintUsed ? dict.answerYes : dict.answerNo}`,
      `${dict.shareResult}: ${
        resultCard.classList.contains("success")
          ? dict.shareResultSolved
          : state.solved
            ? dict.shareResultMissed
            : dict.shareResultProgress
      }`
    ];

    if (state.questionsAsked.length) {
      lines.push(`${dict.shareQuestions}:`);
      state.questionsAsked.forEach((entry, index) => {
        lines.push(`${index + 1}. ${entry.question} -> ${entry.answer}`);
      });
    }

    if (state.solved) {
      lines.push(`${dict.shareAnswer}: ${state.player.name}`);
    }

    lines.push(window.location.href);
    return lines.join("\n");
  }

  async function handleShare() {
    const text = buildShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: t().shareTitle,
          text
        });
        setFeedback(t().shareDone, "positive");
        return;
      } catch (error) {
        if (error && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setFeedback(t().shareCopied, "positive");
    } catch (error) {
      setFeedback(t().shareUnavailable, "warning");
    }
  }

  function setLanguage(language) {
    state.language = language;
    renderStaticCopy();
    renderStats();
    renderMeta();
    renderHistory();

    if (state.hintUsed) {
      hintBox.textContent = getLocalizedHint();
    }

    if (!state.solved) {
      setFeedback(t().feedbackReady, "");
      return;
    }

    if (resultCard.classList.contains("success")) {
      setResult(t().resultWin(state.player.name), "success");
    } else if (resultCard.classList.contains("failure")) {
      setResult(t().resultLose(state.player.name), "failure");
    }
  }

  function startGame() {
    state.player = pickRandomPlayer();
    state.questionsAsked = [];
    state.hintUsed = false;
    state.solved = false;

    questionInput.value = "";
    guessInput.value = "";
    hintBox.textContent = "";
    hintBox.classList.add("hidden");
    resultCard.textContent = "";
    resultCard.className = "result-card hidden";

    renderStaticCopy();
    renderStats();
    renderHistory();
    renderMeta();
    setFeedback(t().feedbackReady, "");
  }

  questionForm.addEventListener("submit", handleQuestionSubmit);
  guessForm.addEventListener("submit", handleGuessSubmit);
  hintButton.addEventListener("click", handleHint);
  newGameButton.addEventListener("click", startGame);
  shareButton.addEventListener("click", handleShare);

  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.lang);
    });
  });

  window.__gameDebug = {
    answerQuestion,
    state,
    setLanguage,
    startGame
  };

  startGame();
})();
