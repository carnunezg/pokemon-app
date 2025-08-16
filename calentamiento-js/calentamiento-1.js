// Variables y Tipos de Datos

// 1. Declara una constante nombre con tu nombre y una variable edad con tu edad. Luego muestra ambos en consola.

// const nombre = 'Carlos';
// const edad = 37;

// console.log(nombre);
// console.log(edad);


// 2. Declara una variable activo con valor true, y luego reasígnala a false. ¿Qué sucede si intentas hacerlo con const? // error: Uncaught TypeError: Assignment to constant variable.

// let activo = true;
// console.log(activo);

// activo = false;

// console.log(activo);

//¿Qué sucede si intentas hacerlo con const? // error: Uncaught TypeError: Assignment to constant variable.

// 3. Crea una variable precioProducto con un número, y una variable esDisponible con un booleano. Muestra un mensaje que diga:
// Producto cuesta $X y está disponible: true/false.

// let precioProducto = 8000;
// let esDisponible = true;

// let mensaje = `Producto cuesta $${precioProducto} y está disponible: ${esDisponible}.`;

// console.log(mensaje);



// 4. Declara un array con tres colores favoritos y un objeto usuario con
// nombre, edad y si está activo.

// const array = ['azul', 'negro', 'blanco', {nombre: 'carlos', edad: 37, activo: true}];

// console.log(array);

// 5. Usa typeof para imprimir en consola el tipo de cada una de las
// siguientes variables: un número, un string, un booleano, un array,
// un objeto y null.

// let num = 5;
// let string = 'Hola';
// let booleano = true;
// const obj = {nombre: 'carlos', edad: 37};
// const arr = ['azul', 'negro', 'blanco'];
// let nulo = null;

// console.log(typeof num);
// console.log(typeof string);
// console.log(typeof booleano);
// console.log(typeof obj); //object
// console.log(typeof arr); //object typeof [] también devuelve "object", pero para saber si es un arreglo se usa: Array.isArray(arr)
// console.log(typeof nulo); //object typeof null devuelve "object" por un error histórico en JavaScript.

// ¿Por qué no lo corrigieron después?
// Cuando se dieron cuenta del error, ya había muchísimo código en la web que dependía de ese comportamiento.
// Si lo cambiaban, se romperían aplicaciones y páginas.
// Entonces decidieron dejarlo así para siempre (es lo que se llama un legacy bug o error heredado).

// La forma correcta de verificar null es con === null.

// console.log(Array.isArray(arr));
