// CARGADORES DE EVENTOS

/**
 * cargarEventosCabecera() -> void
 * Función que se ejecuta nada más cargar la página web. Incluye todos los eventos de la cabecera.
 */
const cargarEventosCabecera = () => {
  // elementos del DOM
  const menu = document.querySelectorAll(".cabecera__menu__elem");
  const cabecera_menu = document.querySelector(".cabecera__menu");
  const boton_hamburguesa = document.querySelector(".hamburguesa");
  const circulo__hamburguesa = document.querySelector(".circulo__hamburguesa");
  const hamburguesa__icono = document.querySelector(".hamburguesa__icono");
  const cabecera = document.querySelector(".cabecera");
  const body = document.querySelector("body");

  let scroll_anterior = 0; // controla si el usuario cambia la dirección del scroll.
  let pantalla_tactil = false;

  cabecera_menu.addEventListener('touchstart', () => {
    pantalla_tactil = true;
    setTimeout(() => {
      pantalla_tactil = false;
    }, 1000)
  })

  // Handler que controla el scroll sobre la página.
  // permite esconder la cabecera en caso de que el usuario haga scroll hacia abajo, y reaparezca si sube.
  window.addEventListener("scroll", () => {
    if (window.scrollY > scroll_anterior) {
      cabecera_menu.style.transform = "translateY(-10rem)";
    } else {
      cabecera_menu.style.transform = "translateY(0)";
    }

    window.scrollY > 0
      ? (cabecera_menu.style.backgroundColor = "#0d0d0d85")
      : (cabecera_menu.style.backgroundColor = "transparent");

    scroll_anterior = window.scrollY;
  });

  // función para añadir el handler que controla si debe aparecer el menu hamburguesa.
  desplegarMenu(
    circulo__hamburguesa,
    hamburguesa__icono,
    cabecera_menu,
    menu,
    boton_hamburguesa,
    cabecera
  );

  const contenido = document.getElementById("contenido");

  /**
   * fetch principal para cargar la pantalla de INICIO en el index.HTML.
   * La promesa devuelta la convertimos a texto con la función text().
   */
  fetch("../html/home.html").then((response) => {
    response.text().then((text) => {
      contenido.innerHTML = text;
      cargarEventosHome();
    });
  });

  // Handler para controlar si el usuario navega por el menu.
  menu.forEach((boton) => {
    boton.addEventListener("click", () => {
      // cierra el menu desplegado para móvil si el usuario pulsa un botón del menú, y muestra la pantalla deseada.
      if (cabecera_menu.classList.contains("cabecera__menu__desplegado")) {
        abrir_cerrar_menu(
          circulo__hamburguesa,
          hamburguesa__icono,
          cabecera_menu,
          menu,
          boton_hamburguesa,
          cabecera,
          body
        );
      }

      // es necesario quitar primero el selected del botón del menú de la pantalla que se está mostrando para que aprezca selecciionado el nuevo.
      menu.forEach((boton) => {
        boton.classList.remove("selected");
      });

      boton.classList.add("selected"); // se añade la clase a ese elemento de la lista para que aprezca el cuadrado que lo recubre.

      // utiliza el atributo title de las etiquetas li como parámetro del fetch.
      fetch(boton.title).then((response) => {
        response.text().then((text) => {
          contenido.innerHTML = text;

          switch (boton.title) {
            case "../html/home.html":
              cargarEventosHome();
              break;
            case "../html/contact.html":
              cargarEventosContact();
              break;
            case "../html/about.html":
              cargarEventosAbout();
              break;
            case "../html/projects.html":
              cargarEventosProjects(pantalla_tactil);
              break;
            default:
              console.log("Error: 404");
          }
        });
      });
    });
  });
};

const body = document.querySelector("body");

/**
 * cargarEventosHome() -> void
 * Función que carga los eventos de la pantalla de INICIO.
 */
const cargarEventosHome = () => {
  // elementos del DOM
  const fotos = document.querySelectorAll(".foto");

  // Se añade un handler para cada foto de la mini galería, que controla si se pulsa una foto.
  fotos.forEach((foto) => {
    foto.classList.add("foto_animation");

    foto.addEventListener("click", () => {
      if (foto.classList.contains("mostrar")) {
        // la foto está ya en le frente super puesta al resto.
        fotos.forEach((foto) => {
          foto.classList.add("foto_animation");
        });
        foto.classList.remove("mostrar");
      } else {
        // pone la foto al frente del resto.
        fotos.forEach((foto) => {
          foto.classList.contains("mostrar") &&
            foto.classList.remove("mostrar");
        });
        fotos.forEach((foto) => {
          foto.classList.remove("foto_animation");
        });
        foto.classList.add("mostrar");
      }
    });
  });
};

/**
 * cargarEventosContact() -> void
 * Función que carga los eventos de la pantalla de CONTACTO.
 */
const cargarEventosContact = () => {
  // Elementos del DOM.
  const octagono = document.getElementById("octagono");
  const lente = document.querySelector(".lente__redes");

  const red = document.getElementById("red");
  const usuario = document.getElementById("usuario");

  // redes sociales que aparecen la lente de la cámara de fotos.
  const redes_sociales = [
    ["fa-brands fa-instagram", "@lolamazi"],
    ["fa-brands fa-linkedin-in", "lola mazaira"],
  ];

  let red_actual = 0; // controlador de la red que aparece.

  // función que controla la red que debe aparecer en la lente.
  const cambiar_red = () => {
    red_actual === 1 ? (red_actual = 0) : red_actual++;
    red.classList = redes_sociales[red_actual][0];
    usuario.innerText = redes_sociales[red_actual][1];
  };

  // hace uso de la función anterior para cambiar la red social, y añade una animación que simula el sacar una foto.
  lente.addEventListener("click", () => {
    const keyframes = [
      { transform: "", offset: 0 },
      { transform: "scale(0) rotate(180deg)", offset: 0.3 },
      { transform: "scale(0) rotate(180deg)", offset: 0.7 },
      { transform: "scale(1) rotate(0deg)", offset: 1 },
    ];

    octagono.animate(keyframes, 280);

    setTimeout(cambiar_red, 140); // necesario para que no se vea el cambio de la red.
  });
};

/**
 * cargarEventosAbout() -> void
 * Función que carga los eventos de la pantalla de SOBRE MI.
 */
const cargarEventosAbout = () => {
  // Elementos del DOM.
  const gustos_titulo = document.getElementById("gustos_titulo");
  const servicios_titulo = document.getElementById("servicios_titulo");

  const gustos_foto1 = document.getElementById("gustos_foto1");
  const gustos_texto = document.querySelector(".gustos__contenido__gustos");

  const circulo1 = document.getElementById("circulo1");
  const circulo2 = document.getElementById("circulo2");
  const circulo3 = document.getElementById("circulo3");
  const titulo1 = document.getElementById("titulo1");
  const titulo2 = document.getElementById("titulo2");
  const titulo3 = document.getElementById("titulo3");
  const texto1 = document.getElementById("texto1");
  const texto2 = document.getElementById("texto2");
  const texto3 = document.getElementById("texto3");

  // arrays para distinguir las diferentes animaciones que se aplican a los elmentos del DOM.
  const titulos = [gustos_titulo, servicios_titulo];
  const elementos = [
    gustos_texto,
    circulo3,
    titulo3,
    texto3,
    circulo1,
    titulo1,
    texto1,
  ];
  const servicio2 = [circulo2, titulo2, texto2];

  // Handler que controla si los elementos van apareciendo en la pantalla. Hace uso de la función medidas(), que devuelve los valores para que sea posible medir si un elemento aprece.
  window.addEventListener("scroll", () => {
    titulos.forEach((titulo) => {
      const [top, offset, height] = medidas(titulo);
      if (top >= offset - window.innerHeight + height) {
        titulo.style.filter = "opacity(100%)";
      }
    });

    elementos.forEach((elem) => {
      const [top, offset, height] = medidas(elem);
      if (top >= offset - window.innerHeight + height / 2) {
        elem.style.transform = "translateX(0)";
      }
    });

    servicio2.forEach((elem) => {
      const [top, offset, height] = medidas(elem);
      if (top >= offset - window.innerHeight + height / 2) {
        elem.style.transform = "translateY(0)";
      }
    });

    const [top, offset, height] = medidas(gustos_texto);
    if (top >= offset - window.innerHeight + height / 2) {
      gustos_foto1.style.transform = "translateX(0)";
    }
  });

  const boton_arriba = document.getElementById("btn_arriba");
  const boton_abajo = document.getElementById("btn_abajo");
  const lista_gustos = document.querySelector(".gustos__caja__lista");

  const foto_montana = document.getElementById("gustos_foto2");
  const foto_animales = document.getElementById("gustos_foto3");
  const foto_viajar = document.getElementById("gustos_foto4");

  let distancia = 0; // controla la posicion del slider.

  // handler que controla si se pulsa el botón de arriba.
  boton_arriba.addEventListener("click", () => {
    if (distancia != 0) {
      // si se puede seguir pulsando porque hay más elementos.
      distancia = distancia + 6;
      lista_gustos.style.transform = `translateY(${distancia}rem)`;
      switch (distancia) {
        case 0:
          foto_montana.classList.add("desaparece_foto2_4");
          foto_montana.classList.remove("aparece_foto2");
          break;
        case -6:
          foto_animales.classList.add("desaparece_foto3");
          foto_animales.classList.remove("aparece_foto3");
          break;
        case -12:
          foto_viajar.classList.add("desaparece_foto2_4");
          foto_viajar.classList.remove("aparece_foto4");
          break;
        default:
          break;
      }
    } else {
      // si  no se puede subir más.
      lista_gustos.animate(
        [
          { transform: `translateY(${distancia}rem) translateX(10px)` },
          { transform: `translateY(${distancia}rem) translateX(-10px)` },
          { transform: `translateY(${distancia}rem) translateX(10px)` },
          { transform: `translateY(${distancia}rem) translateX(-10px)` },
          { transform: `translateY(${distancia}rem) translateX(10px)` },
        ],
        500
      );
    }
  });

  // handler que controla si se pulsa el botón de abajo.
  boton_abajo.addEventListener("click", () => {
    if (distancia != -18) {
      distancia = distancia - 6;
      lista_gustos.style.transform = `translateY(${distancia}rem)`;
      switch (distancia) {
        case -6:
          foto_montana.classList.remove("desaparece_foto2_4");
          foto_montana.classList.add("aparece_foto2");
          break;
        case -12:
          foto_animales.classList.remove("desaparece_foto3");
          foto_animales.classList.add("aparece_foto3");
          break;
        case -18:
          foto_viajar.classList.remove("desaparece_foto2_4");
          foto_viajar.classList.add("aparece_foto4");
          break;
        default:
          break;
      }
    } else {
      lista_gustos.animate(
        [
          { transform: `translateY(${distancia}rem) translateX(10px)` },
          { transform: `translateY(${distancia}rem) translateX(-10px)` },
          { transform: `translateY(${distancia}rem) translateX(10px)` },
          { transform: `translateY(${distancia}rem) translateX(-10px)` },
          { transform: `translateY(${distancia}rem) translateX(10px)` },
        ],
        500
      );
    }
  });
};

/**
 * cargarEventosProjects() -> void
 * Función que carga los eventos de la pantalla de PROYECTOS.
 */
const cargarEventosProjects = (pantalla_tactil) => {
  // Elementos del DOM
  const concierto__cintas = document.querySelectorAll(".concierto__cinta");
  const concierto__fotos__concierto2 = document.querySelector(
    ".concierto__fotos__concierto2"
  );
  const concierto__fotos__concierto3 = document.querySelector(
    ".concierto__fotos__concierto3"
  );
  const concierto__fotos__concierto4 = document.querySelector(
    ".concierto__fotos__concierto4"
  );
  const seccion_mesa = document.querySelector(".seccion_mesa");
  const mesa = document.querySelector(".seccion_mesa__mesa");
  const camara = document.querySelector(".seccion_mesa__camara");
  const cactus = document.querySelector(".seccion_mesa__cactus");
  const icono_cronicas = document.querySelector(
    ".iconos_videos_fotos__cronicas"
  );
  const titulo_cronicas = document.querySelector(
    ".seccion_cronicas__titulo .cronicas_videos_fotos__titulo"
  );
  const libro = document.querySelector(".seccion_cronicas__cronicas__libro");

  const boton_izquierda = document.getElementById("cronicas_boton_izq");
  const boton_derecha = document.getElementById("cronicas_boton_der");

  // arrays para diferenciar como aparecen los elementos.
  const aparecer_cintas = [
    concierto__cintas[0],
    concierto__cintas[1],
    concierto__cintas[2],
    concierto__cintas[3],
    icono_cronicas,
    boton_izquierda,
    boton_derecha,
  ];
  const aparecer_elementos = [titulo_cronicas, libro];

  // controladores para saber si la transición que hace aparecer cada galeria ha terminiado.
  let transicion_concierto2_realizada = false;
  let transicion_concierto3_realizada = false;
  let transicion_concierto4_realizada = false;

  // handler que controla si se hace scroll en la página que hace que aprezcan los elementos.
  window.addEventListener("scroll", () => {
    aparecer_cintas.forEach((elemento) => {
      const [top, offset, height] = medidas(elemento);
      if (top >= offset - window.innerHeight + height / 2) {
        elemento.style.opacity = "100%";
      }
    });

    aparecer_elementos.forEach((elemento) => {
      const [top, offset, height] = medidas(elemento);
      if (top >= offset - window.innerHeight + height / 2) {
        elemento.style.transform = "scale(1)";
        elemento.style.opacity = "100%";
      }
    });

    let [top_concierto, offset_concierto, height_concierto] = medidas(concierto__fotos__concierto2);
    if ((top_concierto >= (offset_concierto - window.innerHeight + (height_concierto / 2))) && (!transicion_concierto2_realizada)) {
      concierto__fotos__concierto2.style.transform = "translateX(0)";
      setTimeout(() => {
        concierto__fotos__concierto2.style.transition = "none";
      }, 2000);
      transicion_concierto2_realizada = true;
    }

    let [top_concierto3, offset_concierto3, height_concierto3] = medidas(concierto__fotos__concierto3);
    if ((top_concierto3 >= (offset_concierto3 - window.innerHeight + (height_concierto3 / 2))) && (!transicion_concierto3_realizada)) {
      console.log('aparece el 2: ', top_concierto3, offset_concierto3, window.innerHeight, (height_concierto3/2), transicion_concierto3_realizada)
      concierto__fotos__concierto3.style.transform = "translateX(0)";
      setTimeout(() => {
        concierto__fotos__concierto3.style.transition = "none";
      }, 2000);
      transicion_concierto3_realizada = true;
    }

    let [top_concierto4, offset_concierto4, height_concierto4] = medidas(concierto__fotos__concierto4);
    if ((top_concierto4 >= (offset_concierto4 - window.innerHeight + (height_concierto4 / 2))) && (!transicion_concierto4_realizada)) {
      console.log('aparece el 3: ', top_concierto4, offset_concierto4, window.innerHeight, (height_concierto4/2), transicion_concierto4_realizada)
      concierto__fotos__concierto4.style.transform = "translateX(0)";
      setTimeout(() => {
        concierto__fotos__concierto4.style.transition = "none";
      }, 2000);
      transicion_concierto4_realizada = true;
    }

    let [top_camara, offset_camara, height_camara] = medidas(camara);
    if (top_camara >= seccion_mesa.offsetTop - window.innerHeight) {
      camara.style.transform = "translateX(0)";
    }

    let [top_cactus, offset_cactus, height_cactus] = medidas(cactus);
    if (top_cactus >= seccion_mesa.offsetTop - window.innerHeight) {
      cactus.style.transform = "translateX(0)";
    }

    let [top_mesa, offset_mesa, height_mesa] = medidas(mesa);
    if (top_mesa >= seccion_mesa.offsetTop - window.innerHeight) {
      mesa.style.transform = "scale(1)";
      mesa.style.opacity = "100%";
    }
  });

  const conjunto_fotos = document.querySelectorAll(".concierto__fotos");
  const fotos = document.querySelectorAll(".foto");
  // conjunto de listas de las fotos que deben realizar la animación cuando se mueve el slider (las que tienen una sola pinza).
  const fotos_a_mover = [
    [
      fotos[0],
      fotos[2],
      fotos[3],
      fotos[5],
      fotos[6],
      fotos[8],
      fotos[9],
      fotos[11],
      fotos[12],
    ],
    [fotos[14], fotos[16], fotos[17], fotos[19], fotos[20]],
    [fotos[22], fotos[24], fotos[25], fotos[27], fotos[28], fotos[30]],
    [
      fotos[31],
      fotos[33],
      fotos[34],
      fotos[36],
      fotos[37],
      fotos[39],
      fotos[40],
    ],
  ];

  let posicion_array = 0; // controlador de la lista del array anterior que hay que pasar como parámetro de la función eventosSlider().

  const contenedores_slider = document.querySelectorAll('.contenedor__concierto__fotos');
  if (pantalla_tactil) {
    contenedores_slider.forEach(contenedorSlider => {
      contenedorSlider.classList.add('contenedor__concierto__fotos__tactil');
    })
  } else {
    conjunto_fotos.forEach((slider) => {
      eventosSlider(slider, fotos_a_mover[posicion_array]); // función que controla si se desplaza el slider.
      posicion_array++;
    });
  }

  eventoBotones(boton_izquierda, boton_derecha); // fucnión que permite pasar la página en el libro que contiene las crónicas.
};

window.onload = cargarEventosCabecera; // cuando se carga la web poro primera vez.

// FUNCIONES QUE UTILIZAN LOS CARGADORES DE EVENTOS

/**
 * función que devuelve los valores necesarios para conocer si un elemento aparece en la pantalla.
 * @param {HTMLElement} elemento
 * @returns [ top, offset, height ]
 */
function medidas(elemento) {
  let top = window.scrollY; // px que se ha hecho scroll.
  let offset = elemento.offsetTop; // distancia en px desde la parta superior del elemento hasta el principio de la página.
  let height = elemento.offsetHeight; // height del elemento.

  return [top, offset, height];
}

/**
 * añade los handlers necesarios para poder pasar página en el libro que ocntiene las crónicas.
 * Se encuentra esta función con esta estructura ya que si en un futuro hay que añadir más crónicas, se controlaría con la variable "turno_hoja"
 * @param {HTMLElement} boton_izq
 * @param {HTMLElement} boton_der
 */
const eventoBotones = (boton_izq, boton_der) => {
  const paginas = document.querySelectorAll(".paginas_girar");
  const pagina_final = document.querySelector(".final");

  let turno_hoja = 0; // controlador de la hoja a mostrar.

  boton_der.addEventListener("click", () => {
    if (turno_hoja == 0) {
      paginas[turno_hoja].classList.add("pagina_girada");
      paginas[turno_hoja].style.transform =
        "perspective(1000px) rotateY(-180deg)";
      setTimeout(() => {
        pagina_final.classList.add("pagina_final_mostrada");
        paginas[turno_hoja]
          .querySelector(".libro__pagina__detras")
          .classList.add("libro__pagina__detras__chrome");
      }, 500);
    }
  });

  boton_izq.addEventListener("click", () => {
    if (turno_hoja == 0) {
      paginas[turno_hoja].style.transform = "perspective(1000px) rotateY(0deg)";
      setTimeout(() => {
        paginas[turno_hoja].classList.remove("pagina_girada");
        paginas[turno_hoja]
          .querySelector(".libro__pagina__detras")
          .classList.remove("libro__pagina__detras__chrome");
      }, 500); // necesario para que la página mantenga el índice hasta que acabe la transición.
      pagina_final.classList.remove("pagina_final_mostrada");
    }
  });
};

/**
 * controla si se despliega o se cierra el menú de navegación.
 * @param {HTMLElement} circulo__hamburguesa
 * @param {HTMLElement} hamburguesa__icono
 * @param {HTMLElement} cabecera_menu
 * @param {HTMLCollection} menu
 * @param {HTMLElement} boton_hamburguesa
 * @param {HTMLElement} cabecera
 */
const desplegarMenu = (
  circulo__hamburguesa,
  hamburguesa__icono,
  cabecera_menu,
  menu,
  boton_hamburguesa,
  cabecera
) => {
  boton_hamburguesa.addEventListener("click", () => {
    const body = document.querySelector("body");

    // abre o cierra el menu.
    abrir_cerrar_menu(
      circulo__hamburguesa,
      hamburguesa__icono,
      cabecera_menu,
      menu,
      boton_hamburguesa,
      cabecera,
      body
    );
  });
};

/**
 * abre o cierra el menu dependiendo de como esté.
 * @param {HTMLElement} circulo__hamburguesa
 * @param {HTMLElement} hamburguesa__icono
 * @param {HTMLElement} cabecera_menu
 * @param {HTMLCollection} menu
 * @param {HTMLElement} boton_hamburguesa
 * @param {HTMLElement} cabecera
 * @param {HTMLElement} body
 */
const abrir_cerrar_menu = (
  circulo__hamburguesa,
  hamburguesa__icono,
  cabecera_menu,
  menu,
  boton_hamburguesa,
  cabecera,
  body
) => {
  circulo__hamburguesa.classList.toggle("circulo__hamburguesa__desplegado");
  hamburguesa__icono.classList.toggle("fa-xmark");
  hamburguesa__icono.classList.toggle("fa-bars");
  boton_hamburguesa.classList.toggle("cambio_icono_hamburguesa");
  cabecera_menu.classList.toggle("cabecera__menu__desplegado");
  cabecera.classList.toggle("adaptar_cabecera");
  menu.forEach((boton) => {
    boton.classList.toggle("aparecer_menu_desplegable");
  });
  body.classList.toggle("cambiar_overflow");
};

/**
 * incluye los handlers que controlan si el usuario quiere desplazar las galerías.
 * @param {HTMLElement} slider
 * @param {HTMLCollection} fotos_a_mover
 */
const eventosSlider = (slider, fotos_a_mover) => {
  let pulsado = false; // controla si el usuario está clicando el contenedor.
  let startX; // posición inicial donde ha pulsado el ratón (eje X).
  let pixeles_movidos = 0; // controlador de los pixeles movidos.
  let posicion_actual = 0; // controlador de la posición actual.
  let movimiento_anterior = 0; // controlador del scroll en el eje X anterior.

  // handler que controla si se clica en el contenedor.
  slider.onpointerdown = (e) => {
    pulsado = true;
    startX = e.pageX;
  };

  // handler que controla si se deja de clicar en el contenedor.
  slider.onpointerup = () => {
    pulsado = false;
    posicion_actual = pixeles_movidos;
    fotos_a_mover.forEach((foto) => {
      foto.classList.remove("desplazar_foto_izq");
      foto.classList.remove("desplazar_foto_der");
    });
  };

  // handler que controla si el ratón sale del contenedor.
  slider.addEventListener("mouseleave", () => {
    pulsado = false;
    posicion_actual = pixeles_movidos;
    fotos_a_mover.forEach((foto) => {
      foto.classList.remove("desplazar_foto_izq");
      foto.classList.remove("desplazar_foto_der");
    });
  });

  // handler que controla si se mueve el ratón una vez clicado el slider.
  slider.onpointermove = (e) => {
    if (!pulsado) return; // si el ratón está clicado y no es desde el movil.
    e.preventDefault();
    const pixeles_a_mover = e.pageX - startX;
    if (pixeles_movidos > 0 && pixeles_a_mover > 0) { // si se está desplazando el slider a la izquierda sin poderse.
      startX = e.pageX;
    } else if (comprobarFinSlider(slider, pixeles_a_mover)) { // si ya no hay más fotos en la galería a la derecha.
      startX = e.pageX;
    } else {
      // si se puede desplazar el slider.
      let movimiento = posicion_actual + pixeles_a_mover;
      slider.style.transform = `translateX(${movimiento * 1.3}px)`;
      pixeles_movidos = posicion_actual + pixeles_a_mover;
      moverFotografias(movimiento_anterior, movimiento, fotos_a_mover);
      movimiento_anterior = movimiento;
    }
  };
};

/**
 * comprueba si hay más fotos en la galería.
 * @param {HTMLElement} slider
 * @param {Int16Array} pixeles_movidos
 * @param {Int16Array} pixeles_a_mover
 * @returns boolean
 */
const comprobarFinSlider = (slider, pixeles_a_mover) => {
  if (
    slider.getBoundingClientRect().right < window.innerWidth &&
    pixeles_a_mover < 0
  ) {
    return true;
  }
  return false;
};

/**
 * mueve las fotos al desplazar el slider.
 * @param {Int16Array} movimiento_anterior
 * @param {Int16Array} movimiento
 * @param {HTMLCollection} fotos_a_mover
 */
const moverFotografias = (movimiento_anterior, movimiento, fotos_a_mover) => {
  if (movimiento_anterior > movimiento) {
    // si se desplaza el slider a la derecha.
    fotos_a_mover.forEach((foto) => {
      foto.classList.add("desplazar_foto_izq");
      foto.classList.remove("desplazar_foto_der");
    });
  } else {
    // si se desplaza el slider a la izquierda.
    fotos_a_mover.forEach((foto) => {
      foto.classList.add("desplazar_foto_der");
      foto.classList.remove("desplazar_foto_izq");
    });
  }
};
