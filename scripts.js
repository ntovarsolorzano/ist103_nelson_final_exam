
// Initialize the system globally
let courierSystem;

// Constants for validation
const VALIDATION_RULES = {
    PACKAGE_ID: /^\d+$/,
    RECIPIENT_NAME: /^[a-zA-Z\s]+$/,
    DELIVERY_ADDRESS: /^[a-zA-Z\s,.'#-]+$/,
    WEIGHT: /^\d*\.?\d+$/
};

class Package {
    constructor(packageId, recipientName, deliveryAddress, weight) {
        this.packageId = packageId;
        this.recipientName = recipientName;
        this.deliveryAddress = deliveryAddress;
        this.weight = parseFloat(weight);
        this.trackingCode = this.generateTrackingCode();
    }

    generateTrackingCode() {
        const weightInt = Math.round(this.weight * 100);
        return (parseInt(this.packageId) << 8 | weightInt).toString(2);
    }
}

class CourierManagementSystem {
    constructor() {
        this.packages = [];
        this.errors = [];
    }

    validateInput(packageData) {
        this.errors = [];

        // Check for missing fields
        const requiredFields = ['packageId', 'recipientName', 'deliveryAddress', 'weight'];
        for (const field of requiredFields) {
            if (!packageData[field]) {
                this.errors.push(`Error: ${field} is required`);
            }
        }

        if (packageData.packageId && !VALIDATION_RULES.PACKAGE_ID.test(packageData.packageId)) {
            this.errors.push("Error: Package ID must contain only numbers");
        }

        if (packageData.recipientName && !VALIDATION_RULES.RECIPIENT_NAME.test(packageData.recipientName)) {
            this.errors.push("Error: Recipient name must contain only letters and spaces");
        }

        if (packageData.deliveryAddress && !VALIDATION_RULES.DELIVERY_ADDRESS.test(packageData.deliveryAddress)) {
            this.errors.push("Error: Delivery address contains invalid characters");
        }

        if (packageData.weight && (!VALIDATION_RULES.WEIGHT.test(packageData.weight) || parseFloat(packageData.weight) <= 0)) {
            this.errors.push("Error: Weight must be a positive number");
        }

        return this.errors.length === 0;
    }

    // To add package
    addPackage(packageData) {
        if (this.validateInput(packageData)) {
            const newPackage = new Package(
                packageData.packageId,
                packageData.recipientName,
                packageData.deliveryAddress,
                packageData.weight
            );
            this.packages.push(newPackage);
            return { success: true, package: newPackage };
        }
        return { success: false, errors: this.errors };
    }

    // Merge Sort algorithm (has nlog(n) complexity)
    mergeSort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return this.merge(
            this.mergeSort(left),
            this.mergeSort(right)
        );
    }

    merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].weight <= right[rightIndex].weight) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    getSortedPackages() {
        return this.mergeSort([...this.packages]);
    }
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', function () {
    courierSystem = new CourierManagementSystem();
    updatePackagesTable(courierSystem.packages);
});

// UI interaction functions
function handleAddPackage() {
    const packageData = {
        packageId: document.getElementById('packageId').value.trim(),
        recipientName: document.getElementById('recipientName').value.trim(),
        deliveryAddress: document.getElementById('deliveryAddress').value.trim(),
        weight: document.getElementById('weight').value.trim()
    };

    const result = courierSystem.addPackage(packageData);

    if (result.success) {
        displaySuccessMessage("Package added successfully!");
        clearForm();
        updatePackagesTable(courierSystem.packages);
    } else {
        displayErrors(result.errors);
    }
}

function handleSortPackages() {
    const sortedPackages = courierSystem.getSortedPackages();
    updatePackagesTable(sortedPackages);
    displaySuccessMessage("Packages sorted by weight!");
}

// Update packages table
function updatePackagesTable(packages) {
    const tbody = document.getElementById('packagesTableBody');
    tbody.innerHTML = '';

    if (packages.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.textContent = 'No packages available';
        cell.style.textAlign = 'center';
        return;
    }

    packages.forEach(pkg => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = pkg.packageId;
        row.insertCell(1).textContent = pkg.recipientName;
        row.insertCell(2).textContent = pkg.deliveryAddress;
        row.insertCell(3).textContent = pkg.weight;
        row.insertCell(4).textContent = pkg.trackingCode;
    });
}

// Add error container
function displayErrors(errors) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = errors.join('<br>');
    document.getElementById('successMessage').innerHTML = '';
}

// Displays success
function displaySuccessMessage(message) {
    document.getElementById('successMessage').innerHTML = message;
    document.getElementById('errorContainer').innerHTML = '';
}

// Clears form
function clearForm() {
    document.getElementById('packageId').value = '';
    document.getElementById('recipientName').value = '';
    document.getElementById('deliveryAddress').value = '';
    document.getElementById('weight').value = '';
}
