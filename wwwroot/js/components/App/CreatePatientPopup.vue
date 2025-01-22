<template>
  <div>
    <!-- Header -->
    <div class="header pt-2 pb-0 mx-4">
      <span>Patient</span>
      <button class="create-btn rounded-xl" @click="openModal">+ Create Patient</button>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header pb-2">
          <h3>Create New Patient</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="row">
              <!-- Personal Information -->
              <div class="col-6">
                <h4>Personal Information</h4>
<div class="form-group row">
  <!-- Dropdown (Select) in col-4 with dropdown icon inside input -->
  <div class="col-4">
  <label for="document-type">Document No.</label>
  <div class="position-relative">
    <input
      id="document-type"
      v-model="form.documentType"
      class="form-control pr-5"
      placeholder="HKID"
      required
      readonly
      @click="toggleDropdown"
    />
    <!-- Dropdown Icon inside Input -->
    <span class="position-absolute top-50 end-0 translate-middle-y cursor-pointer">
      &#9662; <!-- Downward arrow (you can use an icon here) -->
    </span>
  </div>
</div>

  <!-- Input Text in col-8 with flex -->
  <div class="col-8 d-flex position-relative">
  
    <input 
      id="name" 
      v-model="form.name" 
      type="text" 
      class="form-control pr-5" 
      placeholder="Enter Document No."
      required
    />
    <!-- Cross Icon inside Input -->
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
      @click="form.name = ''"
    >
      &times;
    </span>
  </div>
</div>

<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Surname</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder="Surname"
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">Given Name</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="Given Name"
      required 
    />
  </div>
</div>

<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Chinese</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder="Chinese"
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">Sex</label>
    <div class="tabs" style="display: flex; gap: 10px;">
      <label class="tab-option" style="cursor: pointer; padding: 10px 20px; border: 1px solid #ccc; border-radius: 50px; text-align: center;" :class="{'active': form.sex === 'male'}" @click="form.sex = 'male'">Male</label>
      <label class="tab-option" style="cursor: pointer; padding: 10px 20px; border: 1px solid #ccc; border-radius: 50px; text-align: center;" :class="{'active': form.sex === 'female'}" @click="form.sex = 'female'">Female</label>
    </div>
  </div>
</div>

<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Date Of Birth</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder="DD/M/YY"
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">Occupation</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>
</div>



<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Nationality</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder="Nationality"
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">PR No.</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="PR No."
      required 
    />
  </div>
</div>


<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Mobile</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder=""
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">Tel No. (Home)</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>
</div>

<div style="display: flex; justify-content: space-between;">
  <h3>Address</h3>
  <button>Edit Address</button>
</div>

    
               <div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Patient Address</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder=""
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">Mailing Address</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>
</div>

<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Remarks</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder=""
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">Email</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>




  
</div>



<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6">
    <label for="surname">Mailing List</label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder=""
      required 
    />
  </div>

  <div class="col-6">
    <label for="givenName">SMS Language& Option</label>
    <input 
      id="givenName" 
      v-model="form.givenName" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>




  
</div>












              </div>

              <!-- Next of Kin Information -->
              <div class="col-6">
                <h4>Next of Kin</h4>
                             <!-- Next of Kin Information -->
<div class="row d-flex align-start">
  <!-- Kin 1 Section -->
  <div class="col-4">
    <h4>Next of Kin 1</h4>
    <div class="form-group">
      <label for="kin1-name">Name:</label>
      <input 
        id="kin1-name" 
        v-model="form.kin1Name" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 1 Name"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin1-contact">Contact Number:</label>
      <input 
        id="kin1-contact" 
        v-model="form.kin1Contact" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 1 Contact Number"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin1-relation">Relation:</label>
      <input 
        id="kin1-relation" 
        v-model="form.kin1Relation" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 1 Relation"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin1-address">Sms:</label>
      <textarea 
        id="kin1-address" 
        v-model="form.kin1Address" 
        class="form-control" 
        placeholder="Enter Kin 1 Address"
        required
      ></textarea>
    </div>
  </div>

  <!-- Kin 2 Section -->
  <div class="col-4">
    <h4>Next of Kin 2</h4>
    <div class="form-group">
      <label for="kin2-name">Name:</label>
      <input 
        id="kin2-name" 
        v-model="form.kin2Name" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 2 Name"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin2-contact">Contact Number:</label>
      <input 
        id="kin2-contact" 
        v-model="form.kin2Contact" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 2 Contact Number"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin2-relation">Relation:</label>
      <input 
        id="kin2-relation" 
        v-model="form.kin2Relation" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 2 Relation"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin2-address">Sms:</label>
      <textarea 
        id="kin2-address" 
        v-model="form.kin2Address" 
        class="form-control" 
        placeholder="Enter Kin 2 Address"
        required
      ></textarea>
    </div>
  </div>

  <!-- Kin 3 Section -->
  <div class="col-4">
    <h4>Next of Kin 3</h4>
    <div class="form-group">
      <label for="kin3-name">Name:</label>
      <input 
        id="kin3-name" 
        v-model="form.kin3Name" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 3 Name"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin3-contact">Contact Number:</label>
      <input 
        id="kin3-contact" 
        v-model="form.kin3Contact" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 3 Contact Number"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin3-relation">Relation:</label>
      <input 
        id="kin3-relation" 
        v-model="form.kin3Relation" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin 3 Relation"
        required 
      />
    </div>
    <div class="form-group">
      <label for="kin3-address">Sms:</label>
      <textarea 
        id="kin3-address" 
        v-model="form.kin3Address" 
        class="form-control" 
        placeholder="Enter Kin 3 Address"
        required
      ></textarea>
    </div>

    
  </div>
       <div class="col-12">
  <h3>Special Status</h3>
  
  <!-- Sensitive Patient Checkbox -->
  <div style="display: flex; align-items: center;">
    <input id="sensitive-patient" type="checkbox" />
    <label for="sensitive-patient" style="margin-left: 8px;">Sensitive Patient</label>
  </div>
</div>

<div class="col-12" style="display: flex; justify-content: space-between;">
  <!-- Outstanding Bill Checkbox -->
  <div style="display: flex; align-items: center;">
    <input id="outstanding-bill" type="checkbox" />
    <label for="outstanding-bill" style="margin-left: 8px;">Outstanding Bill</label>
  </div>
  
  <!-- Persona non grata Checkbox -->
  <div style="display: flex; align-items: center;">
    <input id="persona-non-grata" type="checkbox" />
    <label for="persona-non-grata" style="margin-left: 8px;">Persona non grata</label>
  </div>
</div>

</div>
<div class="row">
  <div class="col-6">
    <div class="reason-box">
    
      <textarea id="reason1" class="reason-input" placeholder="Reason"></textarea>
    </div>
  </div>
  <div class="col-6">
    <div class="reason-box">
    
      <textarea id="reason2" class="reason-input" placeholder="Reason"></textarea>
    </div>
  </div>
</div>

              </div>

             
            </div>
            <div class="row" style="display: flex; justify-content: end;">
                 <button type="submit" class="cancel-btn rounded-xl">Cancel</button>
            <button type="submit" class="save-btn ms-2 rounded-xl">Save</button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PatientForm',
  setup() {
    const isModalOpen = ref(false);
    const form = ref({
      name: '',
      age: '',
      contact: '',
      address: '',
      kinName: '',
      kinContact: '',
      kinRelation: '',
      kinAddress: '',
    });

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const submitForm = () => {
      console.log('Form submitted:', form.value);
      closeModal();
      form.value = {
        name: '',
        age: '',
        contact: '',
        address: '',
        kinName: '',
        kinContact: '',
        kinRelation: '',
        kinAddress: '',
      };
    };

    return { isModalOpen, form, openModal, closeModal, submitForm };
  },
};
</script>

<style scoped>
input, textarea {
  width: 100%;
  padding: 6px 8px; /* Reduced padding for smaller height */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem; /* Smaller font size */
  height: 36px; /* Smaller height */
}

textarea {
  height: 80px; /* Set a smaller height for the textarea */
}

.form-control {
  padding-right: 2rem; /* Ensures space for the icon */
  font-size: 0.875rem; /* Smaller font size */
  height: 36px; /* Smaller height for input */
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
  right: 25px; /* Adjust to position the icon inside the input */
  top: 50%;
  transform: translateY(-50%);
}

.cursor-pointer {
  cursor: pointer;
}

.submit-btn {
  font-size: 0.875rem; /* Smaller font size for the submit button */
  padding: 8px 12px; /* Reduced padding for a smaller button */
}
.form-group{
   margin-bottom: 0px;
}
.col-8{
   margin-top: 30px;
}
.col-6{
   padding-top: 0px !important;
}

label{
   font-size: 12px;
}
#sensitive-patient{
   width: 2% !important;
}
#outstanding-bill{
   width: 10% !important;
}
#persona-non-grata{
    width: 10% !important;
}


.reason-box {
  width: 100%;
  height: 0;
  padding-bottom: 50%; /* Decrease the height */
  position: relative;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.reason-input {
  position: absolute;
  top: 10%;
  left: 10%;
  right: 10%;
  bottom: 10%;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  resize: none;
  font-size: 16px;
  background-color: transparent;
  box-sizing: border-box;
}

.reason-input:focus {
  outline: none;
}


</style>

