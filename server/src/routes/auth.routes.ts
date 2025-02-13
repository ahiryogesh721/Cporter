import { Router } from "express";
import passport from "../config/passport";

const router = Router();

// Start authentication
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// Facebook callback
router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    (req, res) => {
        console.log('here')
        res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }
);

// Get user data
router.get("/user", (req: any, res: any) => {
    if (req.isAuthenticated()) {
        res.json({
            id: req.user.id,
            name: req.user.displayName,
            email: req.user.emails ? req.user.emails[0].value : null,
            accessToken: req.user.accessToken,
            profilePic: req.user.photos[0].value,
        });
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

// Logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "Error logging out" });
        res.json({ message: "Logged out successfully" });
    });
});

export default router;
