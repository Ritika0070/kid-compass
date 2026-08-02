const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_ROOT || "http://localhost:5001";

export const gameApi = {
  async getLogicalQuestions({ ageGroup, level, count = 5 }, token) {
    const response = await fetch(`${API_BASE_URL}/games/logical-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ageGroup, level, count }),
    });

    const responseOk = response.ok;
    if (responseOk === false) {
      throw new Error("Failed to fetch AI questions");
    }

    return response.json();
  },
};
