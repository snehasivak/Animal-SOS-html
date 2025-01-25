async function loadAdoptableAnimals() {
    const adoptionList = document.getElementById('adoptionList');
    adoptionList.innerHTML = '';

    const snapshot = await db.collection('rescueRequests')
        .where('status', '==', 'treated')
        .get();

    snapshot.forEach(doc => {
        const animal = doc.data();
        const animalElement = document.createElement('div');
        animalElement.innerHTML = `
            <img src="${animal.photoURL}" alt="Animal Photo">
            <p>Location: ${animal.location}</p>
            <button onclick="adoptAnimal('${doc.id}')">Adopt</button>
        `;
        adoptionList.appendChild(animalElement);
    });
}

async function adoptAnimal(docId) {
    await db.collection('rescueRequests').doc(docId).update({
        status: 'adopted'
    });
    loadAdoptableAnimals();
    alert('Animal successfully adopted!');
}

// Load data when adoption page loads
document.addEventListener('DOMContentLoaded', loadAdoptableAnimals);