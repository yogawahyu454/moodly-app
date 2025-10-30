import React from "react";
import PropTypes from "prop-types";

// Ini adalah style CSS di dalam JavaScript (JSS/CSS-in-JS)
// untuk membuat animasinya.
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px", // Jarak antara animasi dan teks
    },
    commetContainer: (size) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: size === "small" ? "40px" : size === "large" ? "80px" : "60px",
        height: size === "small" ? "40px" : size === "large" ? "80px" : "60px",
    }),
    dot: (color, size, delay) => ({
        position: "absolute",
        width: size === "small" ? "8px" : size === "large" ? "16px" : "12px",
        height: size === "small" ? "8px" : size === "large" ? "16px" : "12px",
        backgroundColor: color || "#3139cc", // Warna default dari props
        borderRadius: "50%",
        animation: `commetOrbit 2s infinite ${delay}`,
    }),
    text: (textColor) => ({
        color: textColor || "#3139cc", // Warna default teks
        fontSize: "14px",
        fontWeight: "500",
    }),
};

// Keyframes untuk animasi berputar
// Kamu perlu menambahkan ini ke file CSS global kamu (misal index.css)
/*
@keyframes commetOrbit {
  0% { transform: scale(1); }
  25% { transform: scale(0.3); }
  50% { transform: scale(1); }
  75% { transform: scale(1); }
  100% { transform: scale(1); }
}
*/

/**
 * Komponen loading Commet (3 titik berputar).
 * Props:
 * - color: Warna titik (hex code)
 * - size: Ukuran animasi ('small', 'medium', 'large')
 * - text: Teks di bawah animasi
 * - textColor: Warna teks
 */
const Commet = ({ color, size, text, textColor }) => {
    return (
        <div style={styles.container}>
            {/* PENTING: Tambahkan @keyframes 'commetOrbit' ke file CSS global kamu 
        (seperti index.css atau App.css) agar animasi ini bisa jalan!
      */}
            <style>
                {`
          @keyframes commetOrbit {
            0% { transform: scale(1); }
            25% { transform: scale(0.3); }
            50% { transform: scale(1); }
            75% { transform: scale(1); }
            100% { transform: scale(1); }
          }
        `}
            </style>
            <div style={styles.commetContainer(size)}>
                <span style={styles.dot(color, size, "0s")}></span>
                <span style={styles.dot(color, size, "0.7s")}></span>
                <span style={styles.dot(color, size, "1.4s")}></span>
            </div>
            {text && <span style={styles.text(textColor)}>{text}</span>}
        </div>
    );
};

// Ini untuk validasi tipe props (praktik yang baik)
Commet.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    text: PropTypes.string,
    textColor: PropTypes.string,
};

// Nilai default jika props tidak diisi
Commet.defaultProps = {
    color: "#3139cc",
    size: "medium",
    text: "",
    textColor: "#3139cc",
};

export default Commet;
