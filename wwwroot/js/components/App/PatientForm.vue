<template>
  <div>
   
    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header pb-2">
        <h3>{{ formMode === 'create' ? 'Create New Patient' : 'Edit Patient' }}</h3>
     <button class="close-btn" @click="closeForm">&times;</button>
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
  <label for="document-type">Document No.<span class="red">*</span></label>
  <div class="position-relative">
    <input
  id="document-type"
  value="HKID"
  class="form-control pr-5"
  placeholder="HKID"
  required
  
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
      id="documentNumber" 
      v-model="form.documentNumber" 
      type="text" 
      class="form-control pr-5" 
      placeholder="Document No"
      required
    />
    <!-- Cross Icon inside Input -->
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
    
    >
      &times;
    </span>
  </div>
</div>

<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0 position-relative">
    <label for="surname">Surname<span class="red">*</span></label>
    <input 
      id="surname" 
      v-model="form.surname" 
      type="text" 
      class="form-control" 
      placeholder="Surname"
      required 
    />
     <!-- Cross Icon inside Input -->
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    
  </div>

  <div class="col-6">
    <label for="givenName">Given Name<span class="red">*</span></label>
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
  <div class="col-6 ps-0">
    <label for="chinesename">中文名 </label>
    <input 
      id="chinesename" 
      v-model="form.chineseName" 
      type="text" 
      class="form-control" 
      placeholder="中文名 "
      required 
    />
  </div>

  <div class="col-6">
    <label for="sex">Sex<span class="red">*</span></label>
    <div class="tabs" style="display: flex; gap: 10px;">
      <label class="tab-option" style="cursor: pointer; padding: 10px 15px; border: 1px solid #ccc; border-radius: 50px; text-align: center;" :class="{'active': form.sex === 'male'}" @click="form.sex = 'male'">Male</label>
      <label class="tab-option" style="cursor: pointer; padding: 10px 15px; border: 1px solid #ccc; border-radius: 50px; text-align: center;" :class="{'active': form.sex === 'female'}" @click="form.sex = 'female'">Female</label>
    </div>
  </div>
</div>

<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0">
    <label for="dateOfBirth">Date Of Birth<span class="red">*</span></label>
    <input 
      id="dateOfBirth" 
      v-model="form.dateOfBirth" 
      type="date" 
      class="form-control pe-2" 
      placeholder="DD/M/YY"
      required 
    />
  </div>

  <div class="col-6">
    <label for="occupation">Occupation</label>
    <input 
      id="occupation" 
      v-model="form.occupation" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>
</div>



<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0">
    <label for="nationality">Nationality</label>
    <input 
      id="nationality" 
      v-model="form.nationalityId" 
      type="text" 
      class="form-control" 
      placeholder="Nationality"
      required 
    />
  </div>

  <div class="col-6">
    <label for="prNO">PR No.</label>
    <input 
      id="prNO" 
      v-model="form.prNumber" 
      type="text" 
      class="form-control" 
      placeholder="PR No."
      required 
    />
  </div>
</div>


<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0">
    <label for="MOBILE">Mobile<span class="red">*</span></label>
    <input 
      id="MOBILE" 
      v-model="form.mobileNumber" 
      type="text" 
      class="form-control" 
      placeholder=""
      required 
    />
  </div>

  <div class="col-6">
    <label for="tel">Tel No. (Home)</label>
    <input 
      id="tel" 
      v-model="form.homeTelNo" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      required 
    />
  </div>
</div>

<div style="display: flex; justify-content: space-between;">
  <h3>Address</h3>
  <button type="submit" class="save-btn ms-2 rounded-xl">Edit Address</button>
</div>

    
               <div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0">
    <label for="surname">Patient Address<span class="red">*</span></label>
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
    <label for="givenName">Mailing Address<span class="red">*</span></label>
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
  <div class="col-6 ps-0">
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
  <div class="col-6 ps-0">
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
    <h6>Next of Kin 1</h6>
    <div class="form-group mb-2">
      
      <input 
        id="kin1-name" 
        v-model="form.kin1Name" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin Name"
        required 
      />
    </div>
    <div class="form-group mb-2">
  
      <input 
        id="kin1-contact" 
        v-model="form.kin1Contact" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        required 
      />
    </div>
    <div class="form-group mb-2">
   
      <input 
        id="kin1-relation" 
        v-model="form.kin1Relation" 
        type="text" 
        class="form-control" 
        placeholder="Relation"
        required 
      />
    </div>
    <div class="form-group mb-2">
     
      <textarea 
        id="kin1-address" 
        v-model="form.kin1Address" 
        class="form-control" 
        placeholder="Remarks"
        required
      ></textarea>
    </div>
  </div>

  <!-- Kin 2 Section -->
  <div class="col-4">
    <h6>Next of Kin 2</h6>
    <div class="form-group mb-2">
 
      <input 
        id="kin2-name" 
        v-model="form.kin2Name" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin Name"
        required 
      />
    </div>
    <div class="form-group mb-2">
      
      <input 
        id="kin2-contact" 
        v-model="form.kin2Contact" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        required 
      />
    </div>
    <div class="form-group mb-2">
  
      <input 
        id="kin2-relation" 
        v-model="form.kin2Relation" 
        type="text" 
        class="form-control" 
        placeholder="Relation"
        required 
      />
    </div>
    <div class="form-group mb-2">
      
      <textarea 
        id="kin2-address" 
        v-model="form.kin2Address" 
        class="form-control" 
        placeholder="Remarks"
        required
      ></textarea>
    </div>
  </div>

  <!-- Kin 3 Section -->
  <div class="col-4">
    <h6>Next of Kin 3</h6>
    <div class="form-group mb-2">
      
      <input 
        id="kin3-name" 
        v-model="form.kin3Name" 
        type="text" 
        class="form-control" 
        placeholder="Enter Kin Name"
        required 
      />
    </div>
    <div class="form-group mb-2">
     
      <input 
        id="kin3-contact" 
        v-model="form.kin3Contact" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        required 
      />
    </div>
    <div class="form-group mb-2">
      
      <input 
        id="kin3-relation" 
        v-model="form.kin3Relation" 
        type="text" 
        class="form-control" 
        placeholder="Relation"
        required 
      />
    </div>
    <div class="form-group mb-2">
      
      <textarea 
        id="kin3-address" 
        v-model="form.kin3Address" 
        class="form-control" 
        placeholder="Remarks"
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
            <!-- Button Section -->
<div class="form-group d-flex justify-content-end">
  <!-- Create Form: Cancel and Save buttons on the right -->
   <button v-if="formMode === 'create'" type="submit" class="cancel-btn rounded-xl">Cancel</button>
    <button v-if="formMode === 'create'" type="submit" class="save-btn ms-2 rounded-xl">Save</button>

  <!-- Edit Form: Edit button on the left, Cancel button on the right -->
  <button v-if="formMode === 'edit'" type="button" class="btn btn-outline-primary me-auto" @click="submitForm">
    Edit
  </button>
  <button v-if="formMode === 'edit'" type="submit" class="cancel-btn rounded-xl">Cancel</button>
</div>

           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import patientService from 'services/Patient.js';
export default {
  props: {
    mode: String, // 'create' or 'edit'
    patient: Object,
  },
  data() {
    return {
      formMode: this.mode || 'create',
      form: this.patient || {},
      isModalOpen: true,
      formData: {
        documentTypeId: 0,
        documentNumber: "",
        chineseName: "",
        surname: "",
        givenName: "",
        sex: "",
        dateOfBirth: "",
        occupation: "",
        nationalityId: 0,
        prNumber: "",
        homeTelNo: "",
        mobileCountryCodeId: 0,
        mobileNumber: "",
        isSeparateMailingAddress: true,
        residentStructureAddressZone: "",
        residentStructureAddressDistrict: "",
        residentStructureAddressSubdistrict: "",
        residentStructureAddressStreet: "",
        residentStructureAddressVillage: "",
        residentStructureAddressEstate: "",
        residentStructureAddressBlock: "",
        residentStructureAddressFloor: "",
        residentStructureAddressFlat: "",
        mailingStructureAddressZone: "",
        mailingStructureAddressDistrict: "",
        mailingStructureAddressSubdistrict: "",
        mailingStructureAddressStreet: "",
        mailingStructureAddressVillage: "",
        mailingStructureAddressEstate: "",
        mailingStructureAddressBlock: "",
        mailingStructureAddressFloor: "",
        mailingStructureAddressFlat: "",
        remark: "",
        email: "",
        isMarketingPurpose: true,
        isCancelSubscription: true,
        smsLanguage: "",
        isRefuseSms: true,
        nextOfKin1Name: "",
        nextOfKin1RelationshipId: 0,
        nextOfKin1ContactNumber: "",
        nextOfKin1SmsNumber: "",
        nextOfKin1Remark: "",
        nextOfKin2Name: "",
        nextOfKin2RelationshipId: 0,
        nextOfKin2ContactNumber: "",
        nextOfKin2SmsNumber: "",
        nextOfKin2Remark: "",
        nextOfKin3Name: "",
        nextOfKin3RelationshipId: 0,
        nextOfKin3ContactNumber: "",
        nextOfKin3SmsNumber: "",
        nextOfKin3Remark: "",
        isSensitive: true,
        isOutstandingBill: true,
        outstandingBillReason: "",
        isPersonaNonGrata: true,
        personaNonGrataReason: ""
      }
    };
    
  },
  methods: {
    closeForm() {
      this.isModalOpen = false;
      this.$emit('close');
    },
    
  async submitForm() {
  try {
    // If in 'edit' mode, fetch the patient details first using the patient ID
    if (this.formMode === 'edit') {
      const patientId = this.formData.id; // Make sure to set the correct patient ID in formData
      const patientData = await patientService.getPatient(patientId); // Fetch patient data

      // Now, prepare the data to send to the API for editing
      const updatedPatientData = {
        ...patientData,  // Existing patient data
        ...this.formData, // New form data
      };

      // Call the editPatient method to update the patient
      const response = await patientService.editPatient(patientId, updatedPatientData);
      console.log('Patient updated successfully:', response);
    } else if (this.formMode === 'create') {
      // Prepare the data to send to the API for creating a new patient
      const patientData = {
        documentTypeId: this.formData.documentTypeId,
        documentNumber: this.formData.documentNumber,
        chineseName: this.formData.chineseName,
        surname: this.formData.surname,
        givenName: this.formData.givenName,
        sex: this.formData.sex,
        dateOfBirth: this.formData.dateOfBirth,
        occupation: this.formData.occupation,
        nationalityId: this.formData.nationalityId,
        prNumber: this.formData.prNumber,
        homeTelNo: this.formData.homeTelNo,
        mobileCountryCodeId: this.formData.mobileCountryCodeId,
        mobileNumber: this.formData.mobileNumber,
        isSeparateMailingAddress: this.formData.isSeparateMailingAddress,
        residentStructureAddressZone: this.formData.residentStructureAddressZone,
        residentStructureAddressDistrict: this.formData.residentStructureAddressDistrict,
        residentStructureAddressSubdistrict: this.formData.residentStructureAddressSubdistrict,
        residentStructureAddressStreet: this.formData.residentStructureAddressStreet,
        residentStructureAddressVillage: this.formData.residentStructureAddressVillage,
        residentStructureAddressEstate: this.formData.residentStructureAddressEstate,
        residentStructureAddressBlock: this.formData.residentStructureAddressBlock,
        residentStructureAddressFloor: this.formData.residentStructureAddressFloor,
        residentStructureAddressFlat: this.formData.residentStructureAddressFlat,
        mailingStructureAddressZone: this.formData.mailingStructureAddressZone,
        mailingStructureAddressDistrict: this.formData.mailingStructureAddressDistrict,
        mailingStructureAddressSubdistrict: this.formData.mailingStructureAddressSubdistrict,
        mailingStructureAddressStreet: this.formData.mailingStructureAddressStreet,
        mailingStructureAddressVillage: this.formData.mailingStructureAddressVillage,
        mailingStructureAddressEstate: this.formData.mailingStructureAddressEstate,
        mailingStructureAddressBlock: this.formData.mailingStructureAddressBlock,
        mailingStructureAddressFloor: this.formData.mailingStructureAddressFloor,
        mailingStructureAddressFlat: this.formData.mailingStructureAddressFlat,
        remark: this.formData.remark,
        email: this.formData.email,
        isMarketingPurpose: this.formData.isMarketingPurpose,
        isCancelSubscription: this.formData.isCancelSubscription,
        smsLanguage: this.formData.smsLanguage,
        isRefuseSms: this.formData.isRefuseSms,
        nextOfKin1Name: this.formData.nextOfKin1Name,
        nextOfKin1RelationshipId: this.formData.nextOfKin1RelationshipId,
        nextOfKin1ContactNumber: this.formData.nextOfKin1ContactNumber,
        nextOfKin1SmsNumber: this.formData.nextOfKin1SmsNumber,
        nextOfKin1Remark: this.formData.nextOfKin1Remark,
        nextOfKin2Name: this.formData.nextOfKin2Name,
        nextOfKin2RelationshipId: this.formData.nextOfKin2RelationshipId,
        nextOfKin2ContactNumber: this.formData.nextOfKin2ContactNumber,
        nextOfKin2SmsNumber: this.formData.nextOfKin2SmsNumber,
        nextOfKin2Remark: this.formData.nextOfKin2Remark,
        nextOfKin3Name: this.formData.nextOfKin3Name,
        nextOfKin3RelationshipId: this.formData.nextOfKin3RelationshipId,
        nextOfKin3ContactNumber: this.formData.nextOfKin3ContactNumber,
        nextOfKin3SmsNumber: this.formData.nextOfKin3SmsNumber,
        nextOfKin3Remark: this.formData.nextOfKin3Remark,
        isSensitive: this.formData.isSensitive,
        isOutstandingBill: this.formData.isOutstandingBill,
        outstandingBillReason: this.formData.outstandingBillReason,
        isPersonaNonGrata: this.formData.isPersonaNonGrata,
        personaNonGrataReason: this.formData.personaNonGrataReason
      };

      // Call the createPatient method to create a new patient
      const response = await patientService.createPatient(patientData);
      console.log('Patient created successfully:', response);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}


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
   margin-top: 22px;
}
.col-6{
   padding-top: 0px !important;
 
}

label{
   font-size: 12px;
   color: #7B7B7B;
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
::placeholder{
   font-size: 12px;
}
h3, h4 {
   font-size: 14px;
}
h6{
   color: #7B7B7B !important;
}
.red{
   color: #EC6161!important;
   background-color: #ffffff !important;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    max-height: 90%; /* Adjust this as needed */
    width: 80%; /* Adjust this as needed */
    background-color: white;
    padding: 20px;
    overflow-y: auto !important; /* Enables vertical scrolling when content overflows */
    overflow-x: hidden !important; /* Prevents horizontal scrolling */
}



</style>

