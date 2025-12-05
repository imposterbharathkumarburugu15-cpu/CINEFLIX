import React from "react";

const About = () => {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        minHeight: "100vh",
        padding: "50px 30px",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        animation: "fadeIn 1.5s ease"
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <h1
        style={{
          fontSize: "48px",
          fontWeight: "700",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#e50914", // Cine red
          marginBottom: "20px"
        }}
      >
        About CineFlix
      </h1>

      <h3
        style={{
          fontWeight: "300",
          fontSize: "20px",
          lineHeight: "1.7",
          maxWidth: "800px",
          color: "#cccccc"
        }}
      >
        CineFlix is a cinematic-inspired React application crafted to showcase
        modern web development with style and precision. Built as a movie
        discovery and ticket booking platform, it lets users explore trending
        films, check ratings, and enjoy a seamless booking experience — all
        within a dark, immersive interface.
        <br /><br />
        Designed with a focus on real-world usability, CineFlix blends clean UI,
        smooth interactions, and scalable architecture. The goal was simple:
        create a platform that doesn’t just function well, but *feels* like a
        complete, production-quality movie app.
      </h3>
    </div>
  );
};

export default About;
