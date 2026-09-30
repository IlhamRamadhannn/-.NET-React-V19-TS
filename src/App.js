// App function ini untuk membuat elemen React yang menampilkan judul "Pixel Perfect Pizzas".
// Fungsi ini menggunakan `React.createElement` untuk membuat elemen
//  `div` yang berisi elemen `h1`.
//  Setelah itu, elemen ini dirender ke dalam DOM menggunakan
//  `ReactDOM.createRoot` dan `root.render`.


// add to the top
import {createElement} from "react";
import { createRoot } from "react-dom/client";

// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);

const Pizza = (props) => {
  return createElement("div", {}, [
    createElement("h1", {}, props.name),
    createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return createElement("div", {}, [
    createElement("h1", {}, "Pixel Perfect Pizzas"),
    createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni",
    }),
    createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "Sliced Ham, Pineapple, Mozzarella Cheese",
    }),
    createElement(Pizza, {
      name: "The Big Meat Pizza",
      description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage",
    }),
  ]);
};

// kode ini mengambil elemen HTML dengan id "root" dari dokumen dan membuat root React menggunakan
// 'ReactDOM.createRoot'. Kemudian, root tersebut digunakan untuk merender
//  elemen React yang dibuat oleh fungsi App ke dalam DOM.
const container = document.getElementById("root");
root.render(React.createElement(App));
