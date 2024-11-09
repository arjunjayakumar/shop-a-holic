export async function http(path: string, config = {}) {
  const apiURL = `${import.meta.env.VITE_BASE_URL}/${path}`,
    requestConfig = {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    };

  try {
    const response = await fetch(apiURL, requestConfig),
      data = await response.json();

    if (response.ok) {
      return { status: response.status, url: response.url, data };
    }
  } catch (error: unknown) {
    return Promise.reject(error || "Something went wrong");
  }
}

http.get = function (path: string, config = {}) {
  return http(path, { ...config, method: "GET" });
};
