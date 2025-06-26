import {
  confirmApplication,
  createJobApplication,
  login,
  register,
  waitForApplicationCompletion,
} from "./services/api";

async function runTest() {
  try {
    console.log("Démarrage du test automatisé");

    await register();
    const authResponse = await login();
    const applicationResponse = await createJobApplication(authResponse.token);

    console.log("Attente de la completion de l'application...");
    const confirmationUrl = await waitForApplicationCompletion(
      applicationResponse.url,
      authResponse.token
    );

    await confirmApplication(confirmationUrl, authResponse.token);

    console.log("Test terminé avec succès");
  } catch (error) {
    console.error("Erreur:", error);
    process.exit(1);
  }
}

runTest();
