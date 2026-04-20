import { apiRequest, getConfiguredEndpoint } from "../lib/api";

const endpoints = {
  explore: getConfiguredEndpoint("VITE_API_EXPLORE_DEBATES", "/debate"),
  debateDetails: getConfiguredEndpoint("VITE_API_DEBATE_DETAILS", "/debate?debateId=:id"),
  react: getConfiguredEndpoint("VITE_API_DEBATE_REACT", "/comment/reaction"),
  comments: getConfiguredEndpoint("VITE_API_DEBATE_COMMENTS", "/comment"),
  login: getConfiguredEndpoint("VITE_API_LOGIN", "/auth/login"),
  signup: getConfiguredEndpoint("VITE_API_SIGNUP", "/auth/signup"),
  adminArticles: getConfiguredEndpoint("VITE_API_ADMIN_ARTICLES", "/admin/articles"),
  aiTopics: getConfiguredEndpoint("VITE_API_AI_TOPICS", "/debate/generatetitle"),
  createDebate: getConfiguredEndpoint("VITE_API_CREATE_DEBATE", "/debate"),
  cancelDebate: getConfiguredEndpoint("VITE_API_CANCEL_DEBATE", "/debate/cancel?debateId=:id"),
};

function withDebateId(template, debateId) {
  return template.replace(":id", String(debateId));
}

function getClientUserId() {
  if (typeof window === "undefined") {
    return "web-client";
  }

  const existing = window.localStorage.getItem("debatex_user_id");
  if (existing) {
    return existing;
  }

  const generated =
    window.crypto?.randomUUID?.() || `web-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem("debatex_user_id", generated);
  return generated;
}

function normalizePercent(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getRemainingLabel(endTime) {
  if (!endTime) {
    return "";
  }

  const diffMs = new Date(endTime).getTime() - Date.now();
  if (!Number.isFinite(diffMs) || diffMs <= 0) {
    return "Ended";
  }

  const totalMinutes = Math.ceil(diffMs / (60 * 1000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }

  return `${minutes}m left`;
}

function derivePercentages(sideACount, sideBCount) {
  const total = sideACount + sideBCount;
  if (total === 0) {
    return { agreePercent: 50, differPercent: 50 };
  }

  const agreePercent = Math.round((sideACount / total) * 100);
  return {
    agreePercent,
    differPercent: 100 - agreePercent,
  };
}

function normalizeExploreDebate(item = {}) {
  const sideACount = Number(item.sideACount || item.sideACommentCount || item.sideAComments || 0);
  const sideBCount = Number(item.sideBCount || item.sideBCommentCount || item.sideBComments || 0);
  const percentages = derivePercentages(sideACount, sideBCount);

  return {
    id: item.id || item.debateId || item.pk || item.slug,
    title: item.title || item.topic || "Untitled debate",
    description: item.description || item.summary || "",
    category: item.category || "General",
    topic: item.topic || item.title || "Untitled debate",
    sideA: item.sideA || "Agree",
    sideB: item.sideB || "Disagree",
    articleUrl: item.articleUrl || "",
    startTime: formatDateTime(item.startTime || item.scheduledAt || item.createdAt || ""),
    remaining: item.remaining || item.timeRemaining || getRemainingLabel(item.endTime),
    participants: Number(item.participants || item.participantCount || sideACount + sideBCount),
    agreePercent: normalizePercent(item.agreePercent ?? item.agree ?? percentages.agreePercent),
    differPercent: normalizePercent(item.differPercent ?? item.differ ?? percentages.differPercent),
    status: String(item.status || "ongoing").toUpperCase(),
    images: item.images || item.participantAvatars || [],
    dateTime: formatDateTime(item.dateTime || item.startTime || item.scheduledAt || ""),
    countdown: item.countdown || item.remaining || getRemainingLabel(item.startTime),
    date: formatDateTime(item.date || item.closedAt || item.startTime || "").split(",")[0] || "",
    time: item.time || "",
    createdAt: item.createdAt || "",
    endTime: item.endTime || "",
  };
}

function normalizeArticle(item = {}) {
  return {
    id: item.id || item.articleId || item.pk,
    title: item.title || "Untitled article",
    summary: item.summary || item.description || "",
    image: item.image || item.thumbnail || item.imageUrl || "",
    interestedCount: Number(item.interestedCount || item.interestCount || 0),
  };
}

function normalizeComment(item = {}) {
  return {
    id: item.id || item.commentId || item.pk,
    side: item.side || "",
    text: item.text || item.comment || item.commentText || "",
    time: item.time || item.createdAtLabel || item.createdAt || "",
    likes: Number(item.likes || item.likeCount || 0),
    dislikes: Number(item.dislikes || item.dislikeCount || 0),
    userReaction: item.userReaction || null,
    replies: Number(item.replies || item.replyCount || 0),
    shares: Number(item.shares || item.shareCount || 0),
    isTrending: Boolean(item.isTrending || item.trending),
    user: {
      name: item.user?.name || item.userName || item.authorName || "Anonymous",
      role: item.user?.role || item.userRole || "",
      avatar: item.user?.avatar || item.userAvatar || "",
    },
  };
}

export async function fetchExploreDebates() {
  const payload = await apiRequest(endpoints.explore);
  const debates = (payload.debates || payload.ongoing || payload.live || []).map(normalizeExploreDebate);

  const ongoing = debates.filter((debate) => debate.status === "ONGOING");
  const upcoming = debates.filter((debate) => debate.status === "UPCOMING");
  const past = debates.filter((debate) => debate.status === "ENDED");

  return {
    ongoing,
    upcoming,
    past,
    articles:
      (payload.articles || payload.interestedArticles || [])
        .map(normalizeArticle)
        .concat(
          debates
            .filter((debate) => debate.articleUrl)
            .map((debate) =>
              normalizeArticle({
                articleId: debate.id,
                title: debate.title,
                description: debate.description,
                imageUrl: "",
              })
            )
        )
        .slice(0, 6),
  };
}

export async function fetchAllDebates() {
  const payload = await apiRequest(endpoints.explore);
  return (payload.debates || payload.ongoing || payload.live || []).map(normalizeExploreDebate);
}

export async function fetchDebateDetails(debateId) {
  const payload = await apiRequest(withDebateId(endpoints.debateDetails, debateId));
  const debate = normalizeExploreDebate(payload.debate || payload);
  const comments = (payload.comments || []).map(normalizeComment);

  return {
    debate,
    comments: {
      agree: comments.filter((comment) => comment.side === debate.sideA),
      differ: comments.filter((comment) => comment.side === debate.sideB),
    },
  };
}

export async function addComment(payload) {
  return apiRequest(endpoints.comments, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function reactToComment({ debateId, commentId, reaction }) {
  return apiRequest(endpoints.react, {
    method: "POST",
    body: JSON.stringify({
      debateId,
      commentId,
      reaction,
      userId: getClientUserId(),
    }),
  });
}

export async function loginUser(credentials) {
  return apiRequest(endpoints.login, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function signupUser(payload) {
  return apiRequest(endpoints.signup, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchAdminArticles() {
  const payload = await apiRequest(endpoints.adminArticles);
  const list = Array.isArray(payload) ? payload : payload.articles || [];
  return list.map(normalizeArticle);
}

export async function fetchSuggestedTopics(articleUrl) {
  const payload = await apiRequest(endpoints.aiTopics, {
    method: "POST",
    body: JSON.stringify({ articleUrl }),
  });

  return payload.titles || payload.topics || payload.suggestedTopics || payload.data || [];
}

export async function createDebate(payload) {
  return apiRequest(endpoints.createDebate, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function cancelDebate(debateId) {
  return apiRequest(withDebateId(endpoints.cancelDebate, debateId), {
    method: "POST",
  });
}
