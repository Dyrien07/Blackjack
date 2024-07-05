(() => {
    "use strict";
    let e = ["C", "D", "H", "S"],
        t = ["A", "J", "Q", "K"],
        r = [],
        a = [],
        l = document.querySelector("#btnPedir"),
        n = document.querySelectorAll("small"),
        d = document.querySelectorAll(".divCartas"),
        s = document.querySelector("#btnDetner"),
        i = document.querySelector("#btnNuevo"),
        o = (e = 2) => {
            (r = []), (a = $());
            for (let t = 0; t < e; t++)
                r.push(0),
                    (n[t].innerText = 0),
                    (d[t].innerHTML = ""),
                    (l.disabled = !1),
                    (s.disabled = !1);
        },
        u = () => {
            let [e, t] = r;
            setTimeout(() => {
                t === e
                    ? alert("Nadie Gana")
                    : e < 21
                        ? alert("Computadora Gana")
                        : t > 21
                            ? alert("Jugador Gana")
                            : alert("Computadora Gana");
            }, 100);
        },
        $ = () => {
            a = [];
            for (let r = 2; r <= 10; r++) for (let l of e) a.push(r + l);
            for (let n of e) for (let d of t) a.push(d + n);
            return _.shuffle(a);
        },
        c = () => {
            if (0 === a.length) {
                alert("No quedan mas cartas.");
                return;
            }
            return a.pop();
        },
        b = (e) => {
            let t = e.substring(0, e.length - 1);
            return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
        },
        f = (e, t) => ((r[t] = r[t] + b(e)), (n[t].innerText = r[t]), r[t]),
        p = (e, t) => {
            let r = document.createElement("img");
            (r.src = "assets/cartas/" + e + ".png"),
                r.classList.add("carta"),
                d[t].append(r);
        },
        g = (e) => {
            let t = 0,
                a = r.length - 1;
            do {
                let l = c();
                if (((t = f(l, a)), p(l, a), e > 21)) break;
            } while (t < e && e <= 21);
            u();
        };
    return (
        l.addEventListener("click", () => {
            let e = c(),
                t = f(e, 0);
            p(e, 0),
                t > 21
                    ? (console.warn("Perdiste"),
                        g(t),
                        (l.disabled = !0),
                        (s.disabled = !0))
                    : 21 === t &&
                    (console.warn("21, Ganaste!"),
                        (l.disabled = !0),
                        (s.disabled = !0),
                        g(t));
        }),
        s.addEventListener("click", () => {
            (l.disabled = !0), (s.disabled = !0), g(r[0]);
        }),
        i.addEventListener("click", () => {
            o(2);
        }),
        { nuevoJuego: o }
    );
})();
