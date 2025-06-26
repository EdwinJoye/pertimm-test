import { config } from "../index";
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  JobApplicationRequest,
  JobApplicationResponse,
  ConfirmApplicationRequest,
} from "../types/api";

export async function register(): Promise<AuthResponse> {
  const url = `${config.API_BASE_URL}/api/v1.1/auth/register/`;

  const requestData: RegisterRequest = {
    email: config.USER_EMAIL,
    password1: config.USER_PASSWORD,
    password2: config.USER_PASSWORD,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erreur lors de l'inscription: ${
        errorData.message || response.statusText
      }`
    );
  }

  return (await response.json()) as AuthResponse;
}

export async function login(): Promise<AuthResponse> {
  const url = `${config.API_BASE_URL}/api/v1.1/auth/login/`;

  const requestData: LoginRequest = {
    email: config.USER_EMAIL,
    password: config.USER_PASSWORD,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erreur lors de la connexion: ${errorData.message || response.statusText}`
    );
  }

  return (await response.json()) as AuthResponse;
}

export async function createJobApplication(
  token: string
): Promise<JobApplicationResponse> {
  const url = `${config.API_BASE_URL}/api/v1.1/job-application-request/`;

  const requestData: JobApplicationRequest = {
    email: config.USER_EMAIL,
    first_name: config.USER_FIRST_NAME,
    last_name: config.USER_LAST_NAME,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erreur lors de la création de l'application: ${
        errorData.message || response.statusText
      }`
    );
  }

  return (await response.json()) as JobApplicationResponse;
}

export async function waitForApplicationCompletion(
  applicationUrl: string,
  token: string
): Promise<string> {
  let attempts = 0;
  const maxAttempts = 30;

  while (attempts < maxAttempts) {
    const response = await fetch(applicationUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la vérification du statut: ${response.statusText}`
      );
    }

    const data = (await response.json()) as JobApplicationResponse;

    if (data.status === "COMPLETED") {
      if (!data.confirmation_url) {
        throw new Error("URL de confirmation manquante");
      }
      return data.confirmation_url;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    attempts++;
  }

  throw new Error(
    "Timeout: L'application n'a pas été complétée dans les temps"
  );
}

export async function confirmApplication(
  confirmationUrl: string,
  token: string
): Promise<void> {
  const requestData: ConfirmApplicationRequest = {
    confirmed: true,
  };

  const response = await fetch(confirmationUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erreur lors de la confirmation: ${
        errorData.message || response.statusText
      }`
    );
  }
}
