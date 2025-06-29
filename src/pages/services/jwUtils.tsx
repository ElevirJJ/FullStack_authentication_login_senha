export const getUserNameFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    const payload = JSON.parse(decodedPayload);
    return payload.nome || payload.sub || "Usuário";
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

  