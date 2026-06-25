const translations = {
  fr: {
    pageTitle: "Accueil | Artiste de cirque",
    nav: {
      home: "Accueil",
      bio: "Biographie",
      mat: "Mat Chinois",
      trap: "Trapèze sangles",
      contact: "Contact",
    },
    hero: {
      firstName: "Valentine",
      lastName: "Yvin",
    },
    bio: {
      heading: "Biographie",
      tagline:
        "Enthousiaste à l'idée de parcourir le monde et de partager sa passion",
      p1: "Valentine est née en France et a grandi au Chili où elle s'est initiée aux arts du cirque.",
      p2: "Elle découvre les aériens durant son adolescence dans un cours récréatif de son quartier. En cherchant à se perfectionner dans les arts du cirque, elle intègre la Minicompania du Circo del Mundo à Santiago du Chili où elle s'entraine pendant 3 ans. A 18 ans, Valentine quitte le Chili pour réaliser son rêve : étudier dans une école de cirque professionnelle.",
      p3: "Immergée dans le monde des aériens, Valentine a toujours été intéressée par les différents appareils aériens. En intégrant, l'école de cirque de Québec, elle cherche à les fusionner. Elle explore alors les sangles loupes et le trapèze danse, techniques qu'elle combine aujourd'hui dans son singulier trapèze sangles.",
      p4: "Rigoureuse et disciplinée, Valentine est impatiente d'intégrer une troupe et de faire rêver le public.",
    },
    disciplines: {
      mat: "Mat Chinois",
      trap: "Trapèze sangles",
    },
    contact: {
      heading: "Contactez-moi",
      name: "Nom",
      email: "Email",
      message: "Message",
      submit: "Envoyer",
      success: "Merci de m'avoir contacté!",
    },
    footer: "© Copyrights - Valentine Yvin - 2020",
  },
  en: {
    pageTitle: "Home | Artiste de cirque",
    nav: {
      home: "Home",
      bio: "Biography",
      mat: "Chinese Pole",
      trap: "Strapeze",
      contact: "Contact",
    },
    hero: {
      firstName: "Valentine",
      lastName: "Yvin",
    },
    bio: {
      heading: "Biography",
      tagline:
        "Enthusiastic about traveling the world and sharing her passion",
      p1: "Valentine was born in France and grew up in Chile where she was introduced to the circus arts.",
      p2: "She discovered aerial arts during her adolescence in a recreational course in her neighborhood. Seeking to perfect herself in the circus arts, she joined the Minicompania of Circo del Mundo in Santiago de Chile where she trained for 3 years. At 18, Valentine leaves Chile to realize her dream: to study in a professional circus school.",
      p3: "Immersed in the aerial world, Valentine has always been interested in different aerial devices. By joining the Quebec circus school, she seeks to merge them. She then explores the straps and the dance trapeze, techniques which she combines today in her singular strapeze.",
      p4: "Rigorous and disciplined, Valentine is impatient to join a troupe and make the public dream.",
    },
    disciplines: {
      mat: "Chinese Pole",
      trap: "Strapeze",
    },
    contact: {
      heading: "Contact",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send",
      success: "Thank you for contacting me!",
    },
    footer: "© Copyrights - Valentine Yvin - 2020",
  },
  es: {
    pageTitle: "Inicio | Artiste de cirque",
    nav: {
      home: "Inicio",
      bio: "Biografía",
      mat: "Mastro Chino",
      trap: "Trapecio cintas",
      contact: "Contacto",
    },
    hero: {
      firstName: "Valentine",
      lastName: "Yvin",
    },
    bio: {
      heading: "Biografía",
      tagline:
        "Entusiasta por vivir de su pasión y viajar por el mundo.",
      p1: "Valentine nació en Francia y creció en Chile, donde se introdujo en las artes del circo.",
      p2: "Descubrió las artes aéreas durante su adolescencia en un curso recreativo en la comuna donde iba al colegio. Buscando perfeccionarse en las artes del circo, se unió a la Minicompañía del Circo del Mundo en Santiago de Chile, donde participo durante 3 años. A los 18 años, Valentine dejo Chile para realizar su sueño: estudiar en una escuela de circo profesional.",
      p3: "Inmersa en el mundo de los aéreos, Valentine siempre ha estado interesada en los distintos aparatos aéreos. Al entrar a la escuela de circo de Quebec, Valentine busco fusionarlos explorando las cintas y el trapecio, técnicas que combina hoy en su singular trapecio cintas.",
      p4: "Rigurosa y disciplinada, Valentine está impaciente por unirse a una compañía y hacer soñar el publico.",
    },
    disciplines: {
      mat: "Mastro Chino",
      trap: "Trapecio cintas",
    },
    contact: {
      heading: "Contacto",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      submit: "Enviar",
      success: "¡Gracias por contactarme!",
    },
    footer: "© Copyrights - Valentine Yvin - 2020",
  },
};

function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

function setLanguage(lang) {
  const supported = ["fr", "en", "es"];
  const selected = supported.includes(lang) ? lang : "fr";
  const t = translations[selected];

  document.documentElement.lang = selected;
  document.title = t.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = getNestedValue(t, key);
    if (value !== undefined) {
      el.placeholder = value;
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === selected);
    btn.setAttribute("aria-pressed", btn.dataset.lang === selected);
  });

  localStorage.setItem("lang", selected);

  const url = new URL(window.location);
  if (selected === "fr") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", selected);
  }
  window.history.replaceState({}, "", url);
}

function initLanguage() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang");
  const fromStorage = localStorage.getItem("lang");
  const lang = fromUrl || fromStorage || "fr";
  setLanguage(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
