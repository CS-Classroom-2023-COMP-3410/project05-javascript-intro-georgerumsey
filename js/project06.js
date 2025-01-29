// This file contains the JavaScript code for the interactive periodic table, managing element displays, search functionality, and highlighting.

const elements = [
    { name: "Hydrogen", symbol: "H", atomicNumber: 1, group: "Nonmetals", period: 1, groupNumber: 1 },
    { name: "Helium", symbol: "He", atomicNumber: 2, group: "Noble gases", period: 1, groupNumber: 18 },
    { name: "Lithium", symbol: "Li", atomicNumber: 3, group: "Alkali metals", period: 2, groupNumber: 1 },
    { name: "Beryllium", symbol: "Be", atomicNumber: 4, group: "Alkaline earth metals", period: 2, groupNumber: 2 },
    { name: "Boron", symbol: "B", atomicNumber: 5, group: "Metalloids", period: 2, groupNumber: 13 },
    { name: "Carbon", symbol: "C", atomicNumber: 6, group: "Nonmetals", period: 2, groupNumber: 14 },
    { name: "Nitrogen", symbol: "N", atomicNumber: 7, group: "Nonmetals", period: 2, groupNumber: 15 },
    { name: "Oxygen", symbol: "O", atomicNumber: 8, group: "Nonmetals", period: 2, groupNumber: 16 },
    { name: "Fluorine", symbol: "F", atomicNumber: 9, group: "Halogens", period: 2, groupNumber: 17 },
    { name: "Neon", symbol: "Ne", atomicNumber: 10, group: "Noble gases", period: 2, groupNumber: 18 },
    { name: "Sodium", symbol: "Na", atomicNumber: 11, group: "Alkali metals", period: 3, groupNumber: 1 },
    { name: "Magnesium", symbol: "Mg", atomicNumber: 12, group: "Alkaline earth metals", period: 3, groupNumber: 2 },
    { name: "Aluminum", symbol: "Al", atomicNumber: 13, group: "Post-transition metals", period: 3, groupNumber: 13 },
    { name: "Silicon", symbol: "Si", atomicNumber: 14, group: "Metalloids", period: 3, groupNumber: 14 },
    { name: "Phosphorus", symbol: "P", atomicNumber: 15, group: "Nonmetals", period: 3, groupNumber: 15 },
    { name: "Sulfur", symbol: "S", atomicNumber: 16, group: "Nonmetals", period: 3, groupNumber: 16 },
    { name: "Chlorine", symbol: "Cl", atomicNumber: 17, group: "Halogens", period: 3, groupNumber: 17 },
    { name: "Argon", symbol: "Ar", atomicNumber: 18, group: "Noble gases", period: 3, groupNumber: 18 },
    { name: "Potassium", symbol: "K", atomicNumber: 19, group: "Alkali metals", period: 4, groupNumber: 1 },
    { name: "Calcium", symbol: "Ca", atomicNumber: 20, group: "Alkaline earth metals", period: 4, groupNumber: 2 },
    { name: "Scandium", symbol: "Sc", atomicNumber: 21, group: "Transition metals", period: 4, groupNumber: 3 },
    { name: "Titanium", symbol: "Ti", atomicNumber: 22, group: "Transition metals", period: 4, groupNumber: 4 },
    { name: "Vanadium", symbol: "V", atomicNumber: 23, group: "Transition metals", period: 4, groupNumber: 5 },
    { name: "Chromium", symbol: "Cr", atomicNumber: 24, group: "Transition metals", period: 4, groupNumber: 6 },
    { name: "Manganese", symbol: "Mn", atomicNumber: 25, group: "Transition metals", period: 4, groupNumber: 7 },
    { name: "Iron", symbol: "Fe", atomicNumber: 26, group: "Transition metals", period: 4, groupNumber: 8 },
    { name: "Cobalt", symbol: "Co", atomicNumber: 27, group: "Transition metals", period: 4, groupNumber: 9 },
    { name: "Nickel", symbol: "Ni", atomicNumber: 28, group: "Transition metals", period: 4, groupNumber: 10 },
    { name: "Copper", symbol: "Cu", atomicNumber: 29, group: "Transition metals", period: 4, groupNumber: 11 },
    { name: "Zinc", symbol: "Zn", atomicNumber: 30, group: "Transition metals", period: 4, groupNumber: 12 },
    { name: "Gallium", symbol: "Ga", atomicNumber: 31, group: "Post-transition metals", period: 4, groupNumber: 13 },
    { name: "Germanium", symbol: "Ge", atomicNumber: 32, group: "Metalloids", period: 4, groupNumber: 14 },
    { name: "Arsenic", symbol: "As", atomicNumber: 33, group: "Metalloids", period: 4, groupNumber: 15 },
    { name: "Selenium", symbol: "Se", atomicNumber: 34, group: "Nonmetals", period: 4, groupNumber: 16 },
    { name: "Bromine", symbol: "Br", atomicNumber: 35, group: "Halogens", period: 4, groupNumber: 17 },
    { name: "Krypton", symbol: "Kr", atomicNumber: 36, group: "Noble gases", period: 4, groupNumber: 18 },
    { name: "Rubidium", symbol: "Rb", atomicNumber: 37, group: "Alkali metals", period: 5, groupNumber: 1 },
    { name: "Strontium", symbol: "Sr", atomicNumber: 38, group: "Alkaline earth metals", period: 5, groupNumber: 2 },
    { name: "Yttrium", symbol: "Y", atomicNumber: 39, group: "Transition metals", period: 5, groupNumber: 3 },
    { name: "Zirconium", symbol: "Zr", atomicNumber: 40, group: "Transition metals", period: 5, groupNumber: 4 },
    { name: "Niobium", symbol: "Nb", atomicNumber: 41, group: "Transition metals", period: 5, groupNumber: 5 },
    { name: "Molybdenum", symbol: "Mo", atomicNumber: 42, group: "Transition metals", period: 5, groupNumber: 6 },
    { name: "Technetium", symbol: "Tc", atomicNumber: 43, group: "Transition metals", period: 5, groupNumber: 7 },
    { name: "Ruthenium", symbol: "Ru", atomicNumber: 44, group: "Transition metals", period: 5, groupNumber: 8 },
    { name: "Rhodium", symbol: "Rh", atomicNumber: 45, group: "Transition metals", period: 5, groupNumber: 9 },
    { name: "Palladium", symbol: "Pd", atomicNumber: 46, group: "Transition metals", period: 5, groupNumber: 10 },
    { name: "Silver", symbol: "Ag", atomicNumber: 47, group: "Transition metals", period: 5, groupNumber: 11 },
    { name: "Cadmium", symbol: "Cd", atomicNumber: 48, group: "Transition metals", period: 5, groupNumber: 12 },
    { name: "Indium", symbol: "In", atomicNumber: 49, group: "Post-transition metals", period: 5, groupNumber: 13 },
    { name: "Tin", symbol: "Sn", atomicNumber: 50, group: "Post-transition metals", period: 5, groupNumber: 14 },
    { name: "Antimony", symbol: "Sb", atomicNumber: 51, group: "Metalloids", period: 5, groupNumber: 15 },
    { name: "Tellurium", symbol: "Te", atomicNumber: 52, group: "Metalloids", period: 5, groupNumber: 16 },
    { name: "Iodine", symbol: "I", atomicNumber: 53, group: "Halogens", period: 5, groupNumber: 17 },
    { name: "Xenon", symbol: "Xe", atomicNumber: 54, group: "Noble gases", period: 5, groupNumber: 18 },
    { name: "Cesium", symbol: "Cs", atomicNumber: 55, group: "Alkali metals", period: 6, groupNumber: 1 },
    { name: "Barium", symbol: "Ba", atomicNumber: 56, group: "Alkaline earth metals", period: 6, groupNumber: 2 },
    { name: "Lanthanum", symbol: "La", atomicNumber: 57, group: "Lanthanides", period: 6, groupNumber: 3 },
    { name: "Cerium", symbol: "Ce", atomicNumber: 58, group: "Lanthanides", period: 6, groupNumber: 4 },
    { name: "Praseodymium", symbol: "Pr", atomicNumber: 59, group: "Lanthanides", period: 6, groupNumber: 5 },
    { name: "Neodymium", symbol: "Nd", atomicNumber: 60, group: "Lanthanides", period: 6, groupNumber: 6 },
    { name: "Promethium", symbol: "Pm", atomicNumber: 61, group: "Lanthanides", period: 6, groupNumber: 7 },
    { name: "Samarium", symbol: "Sm", atomicNumber: 62, group: "Lanthanides", period: 6, groupNumber: 8 },
    { name: "Europium", symbol: "Eu", atomicNumber: 63, group: "Lanthanides", period: 6, groupNumber: 9 },
    { name: "Gadolinium", symbol: "Gd", atomicNumber: 64, group: "Lanthanides", period: 6, groupNumber: 10 },
    { name: "Terbium", symbol: "Tb", atomicNumber: 65, group: "Lanthanides", period: 6, groupNumber: 11 },
    { name: "Dysprosium", symbol: "Dy", atomicNumber: 66, group: "Lanthanides", period: 6, groupNumber: 12 },
    { name: "Holmium", symbol: "Ho", atomicNumber: 67, group: "Lanthanides", period: 6, groupNumber: 13 },
    { name: "Erbium", symbol: "Er", atomicNumber: 68, group: "Lanthanides", period: 6, groupNumber: 14 },
    { name: "Thulium", symbol: "Tm", atomicNumber: 69, group: "Lanthanides", period: 6, groupNumber: 15 },
    { name: "Ytterbium", symbol: "Yb", atomicNumber: 70, group: "Lanthanides", period: 6, groupNumber: 16 },
    { name: "Lutetium", symbol: "Lu", atomicNumber: 71, group: "Lanthanides", period: 6, groupNumber: 17 },
    { name: "Hafnium", symbol: "Hf", atomicNumber: 72, group: "Transition metals", period: 6, groupNumber: 4 },
    { name: "Tantalum", symbol: "Ta", atomicNumber: 73, group: "Transition metals", period: 6, groupNumber: 5 },
    { name: "Tungsten", symbol: "W", atomicNumber: 74, group: "Transition metals", period: 6, groupNumber: 6 },
    { name: "Rhenium", symbol: "Re", atomicNumber: 75, group: "Transition metals", period: 6, groupNumber: 7 },
    { name: "Osmium", symbol: "Os", atomicNumber: 76, group: "Transition metals", period: 6, groupNumber: 8 },
    { name: "Iridium", symbol: "Ir", atomicNumber: 77, group: "Transition metals", period: 6, groupNumber: 9 },
    { name: "Platinum", symbol: "Pt", atomicNumber: 78, group: "Transition metals", period: 6, groupNumber: 10 },
    { name: "Gold", symbol: "Au", atomicNumber: 79, group: "Transition metals", period: 6, groupNumber: 11 },
    { name: "Mercury", symbol: "Hg", atomicNumber: 80, group: "Transition metals", period: 6, groupNumber: 12 },
    { name: "Thallium", symbol: "Tl", atomicNumber: 81, group: "Post-transition metals", period: 6, groupNumber: 13 },
    { name: "Lead", symbol: "Pb", atomicNumber: 82, group: "Post-transition metals", period: 6, groupNumber: 14 },
    { name: "Bismuth", symbol: "Bi", atomicNumber: 83, group: "Post-transition metals", period: 6, groupNumber: 15 },
    { name: "Polonium", symbol: "Po", atomicNumber: 84, group: "Metalloids", period: 6, groupNumber: 16 },
    { name: "Astatine", symbol: "At", atomicNumber: 85, group: "Halogens", period: 6, groupNumber: 17 },
    { name: "Radon", symbol: "Rn", atomicNumber: 86, group: "Noble gases", period: 6, groupNumber: 18 },
    { name: "Francium", symbol: "Fr", atomicNumber: 87, group: "Alkali metals", period: 7, groupNumber: 1 },
    { name: "Radium", symbol: "Ra", atomicNumber: 88, group: "Alkaline earth metals", period: 7, groupNumber: 2 },
    { name: "Actinium", symbol: "Ac", atomicNumber: 89, group: "Actinides", period: 7, groupNumber: 3 },
    { name: "Thorium", symbol: "Th", atomicNumber: 90, group: "Actinides", period: 7, groupNumber: 4 },
    { name: "Protactinium", symbol: "Pa", atomicNumber: 91, group: "Actinides", period: 7, groupNumber: 5 },
    { name: "Uranium", symbol: "U", atomicNumber: 92, group: "Actinides", period: 7, groupNumber: 6 },
    { name: "Neptunium", symbol: "Np", atomicNumber: 93, group: "Actinides", period: 7, groupNumber: 7 },
    { name: "Plutonium", symbol: "Pu", atomicNumber: 94, group: "Actinides", period: 7, groupNumber: 8 },
    { name: "Americium", symbol: "Am", atomicNumber: 95, group: "Actinides", period: 7, groupNumber: 9 },
    { name: "Curium", symbol: "Cm", atomicNumber: 96, group: "Actinides", period: 7, groupNumber: 10 },
    { name: "Berkelium", symbol: "Bk", atomicNumber: 97, group: "Actinides", period: 7, groupNumber: 11 },
    { name: "Californium", symbol: "Cf", atomicNumber: 98, group: "Actinides", period: 7, groupNumber: 12 },
    { name: "Einsteinium", symbol: "Es", atomicNumber: 99, group: "Actinides", period: 7, groupNumber: 13 },
    { name: "Fermium", symbol: "Fm", atomicNumber: 100, group: "Actinides", period: 7, groupNumber: 14 },
    { name: "Mendelevium", symbol: "Md", atomicNumber: 101, group: "Actinides", period: 7, groupNumber: 15 },
    { name: "Nobelium", symbol: "No", atomicNumber: 102, group: "Actinides", period: 7, groupNumber: 16 },
    { name: "Lawrencium", symbol: "Lr", atomicNumber: 103, group: "Actinides", period: 7, groupNumber: 17 },
    { name: "Rutherfordium", symbol: "Rf", atomicNumber: 104, group: "Transition metals", period: 7, groupNumber: 4 },
    { name: "Dubnium", symbol: "Db", atomicNumber: 105, group: "Transition metals", period: 7, groupNumber: 5 },
    { name: "Seaborgium", symbol: "Sg", atomicNumber: 106, group: "Transition metals", period: 7, groupNumber: 6 },
    { name: "Bohrium", symbol: "Bh", atomicNumber: 107, group: "Transition metals", period: 7, groupNumber: 7 },
    { name: "Hassium", symbol: "Hs", atomicNumber: 108, group: "Transition metals", period: 7, groupNumber: 8 },
    { name: "Meitnerium", symbol: "Mt", atomicNumber: 109, group: "Transition metals", period: 7, groupNumber: 9 },
    { name: "Darmstadtium", symbol: "Ds", atomicNumber: 110, group: "Transition metals", period: 7, groupNumber: 10 },
    { name: "Roentgenium", symbol: "Rg", atomicNumber: 111, group: "Transition metals", period: 7, groupNumber: 11 },
    { name: "Copernicium", symbol: "Cn", atomicNumber: 112, group: "Transition metals", period: 7, groupNumber: 12 },
    { name: "Nihonium", symbol: "Nh", atomicNumber: 113, group: "Post-transition metals", period: 7, groupNumber: 13 },
    { name: "Flerovium", symbol: "Fl", atomicNumber: 114, group: "Post-transition metals", period: 7, groupNumber: 14 },
    { name: "Moscovium", symbol: "Mc", atomicNumber: 115, group: "Post-transition metals", period: 7, groupNumber: 15 },
    { name: "Livermorium", symbol: "Lv", atomicNumber: 116, group: "Post-transition metals", period: 7, groupNumber: 16 },
    { name: "Tennessine", symbol: "Ts", atomicNumber: 117, group: "Halogens", period: 7, groupNumber: 17 },
    { name: "Oganesson", symbol: "Og", atomicNumber: 118, group: "Noble gases", period: 7, groupNumber: 18 }
];

const tableContainer = document.getElementById("periodic-table");
const searchInput = document.getElementById("search");
const selectedElementDisplay = document.getElementById("element-info");

function createElementCard(element) {
    const card = document.createElement("div");
    card.classList.add("element-card");
    if (element.group === "Lanthanides" && element.atomicNumber !== 57) {
        card.style.gridRow = 8;
        card.style.gridColumn = element.atomicNumber - 54;
    } else if (element.group === "Actinides" && element.atomicNumber !== 89) {
        card.style.gridRow = 9;
        card.style.gridColumn = element.atomicNumber - 86;
    } else {
        card.style.gridRow = element.period;
        card.style.gridColumn = element.groupNumber;
    }
    card.innerHTML = `
        <div class="atomic-number">${element.atomicNumber}</div>
        <h3>${element.symbol}</h3>
        <p>${element.name}</p>
    `;
    card.addEventListener("click", () => displayElementInfo(element));
    return card;
}

function displayElementInfo(element) {
    selectedElementDisplay.innerHTML = `
        <h2>${element.name} (${element.symbol})</h2>
        <p>Atomic Number: ${element.atomicNumber}</p>
        <p>Group: ${element.group}</p>
    `;
    highlightElement(element);
}

function highlightElement(element) {
    const cards = document.querySelectorAll(".element-card");
    cards.forEach(card => {
        card.classList.remove("highlight");
        if (card.querySelector("h3").textContent === element.symbol) {
            card.classList.add("highlight");
        }
    });
}

function filterElements() {
    const searchTerm = searchInput.value.toLowerCase();
    tableContainer.innerHTML = "";
    elements.forEach(element => {
        if (element.name.toLowerCase().includes(searchTerm) || element.symbol.toLowerCase().includes(searchTerm)) {
            tableContainer.appendChild(createElementCard(element));
        }
    });
}

searchInput.addEventListener("input", filterElements);

elements.forEach(element => {
    tableContainer.appendChild(createElementCard(element));
});