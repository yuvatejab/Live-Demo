import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./globals.css";
import { Link } from "@/lib/navigation";
import OnboardingRole from "./pages/onboarding-role";
import SignUp from "./pages/sign-up";
import SignUp2 from "./pages/sign-up2";

const titles: Record<string, string> = {
  "/sign-up": "Create an account · GetVerify",
  "/sign-up2": "Create an account · GetVerify",
  "/onboarding/role": "Choose your role · GetVerify",
};

/** Links in the pages that lead outside this preview land here. */
function NotInPreview() {
  return (
    <main style={{ display: "grid", minHeight: "100dvh", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1>Not part of this preview</h1>
        <p style={{ margin: "12px 0 20px" }}>This demo only includes the three design pages.</p>
        <p style={{ display: "grid", gap: 8 }}>
          <Link href="/sign-up">Sign up</Link>
          <Link href="/sign-up2">Sign up, second design</Link>
          <Link href="/onboarding/role">Choose your role</Link>
        </p>
      </div>
    </main>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/sign-up" replace /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-up2", element: <SignUp2 /> },
  { path: "/onboarding/role", element: <OnboardingRole /> },
  { path: "*", element: <NotInPreview /> },
]);

router.subscribe((state) => {
  document.title = titles[state.location.pathname] ?? "GetVerify · Design preview";
});
document.title = titles[location.pathname] ?? "GetVerify · Design preview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
