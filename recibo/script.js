const template = document.getElementById("template");
const list = document.getElementById("list");
const btnMostrar = document.querySelector(".btnMostrar");
const fragment = document.createDocumentFragment();
const error = document.querySelector(".error");
const total = document.getElementById("total");

const arrayProductos = [];
let idCount = 0;

/* Esta funcion crea un objeto y accede a los inputs,
verifica que los inputs tengan los campos con información,
luego empuja el objeto al array de Productos  y los muestra
en pantalla y tambien muestra la suma total de los precios*/

const agregarCarrito = () => {
	let form = document.forms["form"];
	let producto = form["producto"];
	let precio = form["precio"];

	const recibo = {
		id: ++idCount,
		producto: producto.cloneNode(true),
		precio: precio.cloneNode(true)
	};

	if (producto.value != "" && precio.value != "") {
		arrayProductos.push(recibo);
		mostrarCarrito(arrayProductos);
		mostrarTotal(arrayProductos);
		form.reset();
	} else if (producto.value === "" && precio.value === "") {
		error.style.display = "block";
		error.textContent = "No hay valores";
		setTimeout(() => {
			error.style.display = "none";
		}, 1300);
	} else if (
		(producto.value === "" && precio.value != "") ||
		(producto.value != "" && precio.value === "")
	) {
		error.style.display = "block";
		error.textContent = "falta un valor";
		setTimeout(() => {
			error.style.display = "none";
		}, 1300);
	}
};

/* Display */

const mostrarCarrito = (array) => {
	fragment.innerHTML = "";

	array.forEach((object) => {
		const clone = template.content.cloneNode(true);
		clone.querySelector(".prodNam").textContent = object.producto.value;
		clone.querySelector(".priceNum").textContent = object.precio.value;
		clone.querySelectorAll(".list__btn--delete").forEach((btn) => {
			btn.addEventListener("click", () => {
				deleteProducto(array, object.id);
			});
		});
		clone.querySelectorAll(".list__btn--edit").forEach((btn) => {
			btn.addEventListener("click", () => {
				editarProducto(array, object.id);
			});
		});

		fragment.appendChild(clone);
	});
	list.innerHTML = "";
	list.appendChild(fragment);
};

/* Mostrar la suma total de los productos */

const mostrarTotal = (array) => {
	let totalPrecio = 0;
	array.forEach((object) => {
		totalPrecio += parseFloat(object.precio.value);
	});
	total.textContent = totalPrecio.toFixed(2);
};

/* Eliminar un producto */

const deleteProducto = (array, id) => {
	const index = array.findIndex((obj) => obj.id === id);

	if (window.confirm("¿Estás seguro de Eliminar este Producto?")) {
		if (index !== -1) {
			array.splice(index, 1);

			mostrarCarrito(array);
			mostrarTotal(array);
		}
	}
};

/* Editar un Producto */

const editarProducto = (array, id) => {
	const index = array.findIndex((obj) => obj.id === id);
	console.log(id);

	if (index !== -1) {
		const producto = array[index].producto.value;
		const precio = array[index].precio.value;
		array.splice(index, 1);

		const form = document.forms["form"];
		form["producto"].value = producto;
		form["precio"].value = precio;
	}
};

btnMostrar.addEventListener("click", agregarCarrito);
