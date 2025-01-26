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
    <label class="mb-1" for="document-type">Document No.<span class="red">*</span></label>
    <div class="position-relative">
      <!-- Input Field -->
       <input
    id="document-type"
    v-model="selectedOption"
   tabIndex="44" 
    placeholder="HKID"
    readonly
  />
      <!-- Dropdown Icon -->
      <span
        class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
        @click="toggleDropdown"
      >
        &#9662; <!-- Downward arrow -->
      </span>
      <!-- Dropdown Menu -->
      <div
        v-show="isDropdownOpen"
        class="dropdown-menu position-absolute"
        style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
      >
        <div
          class="dropdown-item"
          style="padding: 8px; cursor: pointer;"
          @click="selectOption('HKID')"
        >
          HKID
        </div>
      </div>
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
      tabIndex="43" 
        :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
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
      tabIndex="42" 
       :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
       
    />
     <!-- Cross Icon inside Input -->
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    
  </div>

  <div class="col-6 position-relative">
  <label for="givenName">Given Name<span class="red">*</span></label>
  <input 
    id="givenName" 
    v-model="form.givenName" 
    type="text" 
    class="form-control" 
    placeholder="Given Name"
    tabIndex="41" 
      :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
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
    <label for="chinesename">中文名 </label>
    <input 
      id="chinesename" 
      v-model="form.chineseName" 
      type="text" 
      class="form-control" 
      placeholder="中文名 "
      tabIndex="40" 
       
    />
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
  </div>

 <div class="col-6">
  <label for="sex">Sex<span class="red">*</span></label>
  <div class="tabs" style="display: flex; gap: 10px;">
 <label
  tabIndex="39"
  style="cursor: pointer; padding: 7px 18px; border: 1px solid #ccc; border-radius: 50px; text-align: center;"
  :class="[
    'form-control pr-5 tab-option',
    { 
      'border-red': isFieldInvalid, 
      'active': form.sex === 'Male' || form.sex === 'Female'
    }
  ]"
>


    <input 
      v-model="form.sex" 
      type="radio" 
      value="Male" 
      style="display: none;" 
    />
    Male
  </label>
  <label
  tabIndex="38"
  style="cursor: pointer; padding: 7px 18px; border: 1px solid #ccc; border-radius: 50px; text-align: center;"
  :class="[
    'form-control pr-5 tab-option',
    { 
      'border-red': isFieldInvalid, 
      'active': form.sex === 'Female' 
    }
  ]"
>
    <input 
      v-model="form.sex" 
      type="radio" 
      value="Female" 
      style="display: none;" 
    />
    Female
  </label>
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
      placeholder="DD/M/YYYY"
      tabIndex="37" 
       :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
      
       
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
      tabIndex="36" 
       
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
      tabIndex="35" 
       
    />
  </div>

  <div class="col-6 position-relative">
    <label for="prNO">PR No.</label>
    <input 
      id="prNO" 
      v-model="form.prNumber" 
      type="text" 
      class="form-control" 
      placeholder="PR No."
      tabIndex="34" 
       
    />
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
  </div>
</div>


<div class="form-group" style="display: flex; gap: 10px; align-items: center;">
  <div class="col-6 d-flex " style="padding:0px; margin-top: -16px;">
    <div class="col-4" style="padding:0px;">
  <label class="mb-1" for="document-type">Mobile<span class="red">*</span></label>
  <div class="position-relative">
    <input
  id="mobile-no"
  value="+852"
  class="form-control pr-5"
  placeholder="+852"
  tabIndex="33" 
  
  
/>

    <!-- Dropdown Icon inside Input -->
    <span class="position-absolute top-50 end-0 translate-middle-y cursor-pointer">
      &#9662; <!-- Downward arrow (you can use an icon here) -->
    </span>
  </div>
</div>

  <!-- Input Text in col-8 with flex -->
  <div class="col-8 p-0 d-flex position-relative">
  
    <input 
      id="Mobile" 
      v-model="form.mobileNumber" 
      type="text" 
      class="form-control pr-5" 
      placeholder="Free Text"
      tabIndex="32" 
        :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
      
    />
    <!-- Cross Icon inside Input -->
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
    
    >
      &times;
    </span>
  </div>
  </div>

  <div class="col-6 position-relative">
    <label for="tel">Tel No. (Home)</label>
    <input 
      id="tel" 
      v-model="form.homeTelNo" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      tabIndex="31" 
       
    />
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
  </div>
</div>

<div style="display: flex; justify-content: space-between;">
  <h3>Address</h3>
  <button
  tabIndex="30"
  type="button"
  class="save-btn ms-2 rounded-xl d-flex align-items-center"
  @click="openAddressModal"
>
  <img src="js/assets/icons/picture13.svg" alt="Edit Icon" class="me-2" style="width: 18px;" />
  <span>Edit Address</span>
</button>

</div>

  <edit-address 
    v-if="isAddressModalOpen" 
    :address="address" 
    @close="closeAddressModal" 
    @save="saveAddress" 
  />
 <div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0">
    <label for="patientAddress">Patient Address<span class="red">*</span></label>
    <textarea 
      id="patientAddress" 
    :value="formattedPatientAddress"
      class="form-control" 
      placeholder="Empty"
        :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
       
      style="width: 100%; height: 150px;" 
    ></textarea>
  </div>

  <div class="col-6">
    <label for="mailingAddress">Mailing Address<span class="red">*</span></label>
    <textarea 
      id="mailingAddress" 
       
      class="form-control" 
      placeholder="Empty"
        :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
       
      style="width: 100%; height: 150px;" 
            :value="formattedMailingAddress"
    ></textarea>
  </div>
</div>


<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0 position-relative">
    <label for="remarks">Remarks</label>
    <input 
      id="remarks" 
      v-model="form.remark" 
      type="text" 
      class="form-control" 
      placeholder="Free text"
      tabIndex="29" 
       
    />
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
  </div>

  <div class="col-6 position-relative">
    <label for="email">Email</label>
    <input 
      id="email" 
      v-model="form.email" 
      type="text" 
      class="form-control" 
      placeholder="Free Text"
      tabIndex="28" 
       
    />
    <span 
      class="closed-btn position-absolute top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
  </div>




  
</div>



<div class="form-group" style="display: flex; gap: 10px;">
  <div class="col-6 ps-0">
  <!-- Heading in the first row -->
  <label for="mailingList" class="d-block mb-2">Mailing List</label>

  <!-- Flex row for checkboxes and labels -->
  <div class="d-flex">
    <div class="d-flex align-items-center me-3">
      <input 
        id="marketingPurpose" 
        v-model="form.isMarketingPurpose" 
        type="checkbox" style="width: auto;" 
        class="form-check-input me-1" 
        tabIndex="27" 
      />
      <label for="marketingPurpose" class="form-check-label">Marketing Purpose</label>
    </div>
    
    <div class="d-flex align-items-center">
      <input 
        id="cancelSubscription" 
        v-model="form.isCancelSubscription" 
        type="checkbox" style="width: auto;" 
        class="form-check-input me-1" 
        tabIndex="26" 
      />
      <label for="cancelSubscription" class="form-check-label">Cancel Subscription</label>
    </div>
  </div>
</div>




 <div class="row col-6 d-flex align-items-center justify-content-between ms-1">
  <!-- Tabs as buttons for ENG and CHI -->
    <label for="smsLanguage" class="d-block mb-2">SMS Language & Option<span class="red">*</span></label>
    <div class="row d-flex">
  <div class="tabs" style="display: flex; gap: 10px;">
  <label
  tabIndex="25"
  style="cursor: pointer; padding: 7px 18px; border: 1px solid #ccc; border-radius: 50px; text-align: center;"
  :class="[
    'form-control pr-5 tab-option',
    { 'border-red': isFieldInvalid, 'active': form.smsLanguage === 'Eng' }
  ]"
>
    <input 
     v-model="form.smsLanguage" 
      type="radio" 
      value="Eng" 
      
      style="display: none;" 
    />
    ENG
  </label>
 <label
  tabIndex="24"
  style="cursor: pointer; padding: 7px 18px; border: 1px solid #ccc; border-radius: 50px; text-align: center;"
  :class="[
    'form-control pr-5 tab-option',
    { 'border-red': isFieldInvalid, 'active': form.smsLanguage === 'Chi' }
  ]"
>
    <input 
     v-model="form.smsLanguage"
      type="radio" 
      value="Chi" 
      style="display: none;" 
    />
    CHI
  </label>
</div>

  <!-- Refuse SMS -->
  <div class="d-flex align-items-center ms-4">
    <input 
      id="refuseSms" 
      v-model="form.isRefuseSms" 
      type="checkbox" style="width: auto;" 
      class="form-check-input me-2" 
      tabIndex="23" 
    />
    <label for="refuseSms" class="form-check-label">Refuse SMS</label>
  </div>
</div>
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
    <h6>Next of Kin 1<span class="red">*</span></h6>
    <div class="form-group mb-2 position-relative">
      <input 
        id="kin1-name" 
        v-model="form.nextOfKin1Name" 
        type="text" 
        class="form-control" 
        placeholder="Next of Kin Name"
        tabIndex="22" 
          :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
         
      />
      <span 
      class="closed-btn position-absolute  cross cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
    <div class="form-group mb-2">
   
      <input 
        id="kin1-relation" 
        v-model="form.nextOfKin1RelationshipId" 
        type="text" 
        class="form-control" 
        placeholder="Relationship"
        tabIndex="21" 
          :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
         
      />
    </div>
    <div class="form-group mb-2 position-relative">
  
      <input 
        id="kin1-contact" 
        v-model="form.nextOfKin1ContactNumber" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        tabIndex="20" 
          :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
    
    <div class="form-group mb-2 position-relative">
     
     <input 
        id="kin1-sms" 
        v-model="form.nextOfKin1SmsNumber" 
        type="text" 
        class="form-control" 
        placeholder="SMS"
        tabIndex="19" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>

    <div class="form-group mb-2 position-relative">
     
   <input 
        id="kin1-remarks" 
        v-model="form.nextOfKin1Remark" 
        type="text" 
        class="form-control" 
        placeholder="Remarks"
        tabIndex="18" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
  </div>
  

  <!-- Kin 2 Section -->
  <div class="col-4">
    <h6>Next of Kin 2</h6>
    <div class="form-group mb-2 position-relative">
 
      <input 
        id="kin2-name" 
        v-model="form.nextOfKin2Name" 
        type="text" 
        class="form-control" 
        placeholder="Next of Kin Name"
        tabIndex="17" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
     <div class="form-group mb-2">
  
      <input 
        id="kin2-relation" 
        v-model="form.nextOfKin2RelationshipId" 
        type="text" 
        class="form-control" 
        placeholder="Relationship"

        tabIndex="16" 
         
      />
    </div>
    <div class="form-group mb-2 position-relative">
      
      <input 
        id="kin2-contact" 
        v-model="form.nextOfKin2ContactNumber" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        tabIndex="15" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
   
    <div class="form-group mb-2 position-relative">
      
     <input 
        id="kin2-sms" 
        v-model="form.nextOfKin2SmsNumber" 
        type="text" 
        class="form-control" 
        placeholder="SMS"
        tabIndex="14" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>

     <div class="form-group mb-2 position-relative">
      
     <input 
        id="kin2-remark" 
        v-model="form.nextOfKin2Remark" 
        type="text" 
        class="form-control" 
        placeholder="Remarks"
        tabIndex="13" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
  </div>

  <!-- Kin 3 Section -->
  <div class="col-4">
    <h6>Next of Kin 3</h6>
    <div class="form-group mb-2 position-relative">
      
      <input 
        id="kin3-name" 
        v-model="form.nextOfKin3Name" 
        type="text" 
        class="form-control" 
        placeholder="Next of Kin Name"
        tabIndex="12" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
      <div class="form-group mb-2">
      
      <input 
        id="kin3-relation" 
        v-model="form.nextOfKin3RelationshipId" 
        type="text" 
        class="form-control" 
        placeholder="Relationship"
        tabIndex="11" 
         
      />
    </div>
    <div class="form-group mb-2 position-relative">
     
      <input 
        id="kin3-contact" 
        v-model="form.nextOfKin3ContactNumber" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        tabIndex="10" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
  
    <div class="form-group mb-2 position-relative">
      
      <input 
        id="kin3-sms" 
        v-model="form.nextOfKin3SmsNumber" 
        type="text" 
        class="form-control" 
        placeholder="SMS"
        tabIndex="9" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
    <div class="form-group mb-2 position-relative">
      
      <input 
        id="kin3-remarks" 
        v-model="form.nextOfKin3Remark" 
        type="text" 
        class="form-control" 
        placeholder="Remarks"
        tabIndex="8" 
         
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>

    
  </div>
       <div class="col-12">
  <h3 class="mb-3">Special Status</h3>
  
 <!-- Sensitive Patient Checkbox -->
<div style="display: flex; align-items: center;">
  <input 
    id="sensitive-patient" 
    v-model="form.isSensitive" 
    tabIndex="7" 
    type="checkbox" 
    style="width: auto;" 
  />
  <label for="sensitive-patient" style="margin-left: 8px;">
    Sensitive Patient
  </label>
</div>
</div>

<div class="col-12" style="display: flex; justify-content: space-between;">
  <div style="display: flex; align-items: center;">
  <input 
    id="outstanding-bill" 
    v-model="form.isOutstandingBill" 
    tabIndex="6" 
    type="checkbox" 
    style="width: auto;" 
  />
  <label for="outstanding-bill" style="margin-left: 8px;">
    Outstanding Bill
  </label>
</div>
  
 <div style="display: flex; align-items: center;">
  <input 
    id="persona-non-grata" 
    v-model="form.isPersonaNonGrata" 
    tabIndex="4" 
    type="checkbox" 
    style="width: auto;" 
  />
  <label for="persona-non-grata" style="margin-left: 8px;">
    Persona non grata
  </label>
</div>
</div>

</div>
<div class="row">
  <div class="col-6">
    <div class="reason-box">
    
      <textarea  id="outstandingReason" v-modal="form.outstandingBillReason" tabIndex="5" class="reason-input" placeholder="Reason"></textarea>
    </div>
  </div>
  <div class="col-6">
    <div class="reason-box">
    
      <textarea id="personaReason" v-model="form.personaNonGrataReason"  class="reason-input" tabIndex="3"  placeholder="Reason"></textarea>
    </div>
  </div>
</div>

              </div>

             
            </div>
            <!-- Button Section -->
<div class="form-group d-flex justify-end">
  <!-- Create Form: Cancel and Save buttons on the right -->
   <button v-if="formMode === 'create'" tabIndex="2" type="submit"  class="cancel-btn rounded-xl" @click="closeForm">Cancel</button>
  <button
  v-if="formMode === 'create'"
  tabIndex="1"
  type="submit"
  class="save-btn ms-2 rounded-xl d-flex align-items-center"
>
  <img src="js/assets/icons/Picture14.svg" alt="Save Icon" class="me-2" style="width: 20px;" />
  <span>Save</span>
</button>


 
<button
  v-if="formMode === 'edit'"
  type="button"
  class="btn btn-outline-primary me-auto editBtn d-flex align-items-center"
  
>
  <img src="js/assets/icons/Picture13.svg" alt="Edit Icon" class="me-2" style="width: 25px;" />
  <span>Edit</span>
</button>


  <button v-if="formMode === 'edit'" type="submit" class="cancel-btn rounded-xl" @click="closeForm">Cancel</button>
</div>

           
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import patientService from 'services/Patient.js';
import EditAddress from 'components/App/EditAddress.vue';
export default {
   components: {
   
    'edit-address': EditAddress,
  },
  props: {
    mode: String, // 'create' or 'edit'
    patient: Object,
  },
  data() {
    return {
          isFieldInvalid: false,
         isDropdownOpen: false, // Tracks if dropdown is open
      selectedOption: "HKID", // The default option
      formMode: this.mode || 'create',
      form: this.patient || {},
      isModalOpen: true,
        isAddressModalOpen: false,
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
      },
      address: {
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
    },
    };
    
  },
  computed: {
  formattedPatientAddress() {
  // Check if any of the resident structure address fields are available
  return [
    this.address.residentStructureAddressZone,
    this.address.residentStructureAddressDistrict,
    this.address.residentStructureAddressSubdistrict,
    this.address.residentStructureAddressStreet,
    this.address.residentStructureAddressVillage,
    this.address.residentStructureAddressEstate,
    this.address.residentStructureAddressBlock,
    this.address.residentStructureAddressFloor,
    this.address.residentStructureAddressFlat
  ]
    .filter(Boolean) // Filters out falsy values like empty strings
    .join(', ') || ''; // Joins the non-empty values with a comma and space, or returns empty string if none
},

formattedMailingAddress() {
  // Similarly handle the mailing address fields
  return [
    this.address.mailingStructureAddressZone,
    this.address.mailingStructureAddressDistrict,
    this.address.mailingStructureAddressSubdistrict,
    this.address.mailingStructureAddressStreet,
    this.address.mailingStructureAddressVillage,
    this.address.mailingStructureAddressEstate,
    this.address.mailingStructureAddressBlock,
    this.address.mailingStructureAddressFloor,
    this.address.mailingStructureAddressFlat
  ]
    .filter(Boolean) // Filters out falsy values like empty strings
    .join(', ') || ''; // Joins the non-empty values with a comma and space, or returns empty string if none
}

},

  methods: {
    closeForm() {
      this.isModalOpen = false;
      this.$emit('close');
    },
     openAddressModal() {
      this.isAddressModalOpen = true;
    },
    closeAddressModal() {
      this.isAddressModalOpen = false;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
     saveAddress(updatedAddress) {
      this.address = updatedAddress;
      this.isAddressModalOpen = false;
    },
   validateField() {
  this.isFieldInvalid = 
    // Check surname
    (this.form.surname && typeof this.form.surname === 'string' && this.form.surname.trim() === '') ||
    // Check document
    (this.form.documentNumber && typeof this.form.documentNumber === 'string' && this.form.documentNumber.trim() === '') ||
    // Check given name
    (this.form.giveName && typeof this.form.giveName === 'string' && this.form.giveName.trim() === '') ||
    // Check sex
    (this.form.sex && typeof this.form.sex === 'string' && this.form.sex.trim() === '') ||
    // Check mobile number
    (this.form.mobileNumber && typeof this.form.mobileNumber === 'string' && this.form.mobileNumber.trim() === '') ||
    // Check parent address
    (this.form.formattedPatientAddress && typeof this.formattedPatientAddress === 'string' && this.form.formattedPatientAddress.trim() === '') ||
    // Check mailing address
    (this.form.formattedMailingAddress && typeof this.formattedMailingAddress === 'string' && this.form.mailingAddress.trim() === '') ||
    // Check SMS language
    (this.form.smsLanguage && typeof this.form.smsLanguage === 'string' && this.form.smsLanguage.trim() === '') ||
    // Check next of kin 1
    (this.form.nextOfKin1Name && typeof this.form.nextOfKin1Name === 'string' && this.form.nextOfKin1Name.trim() === '') || 
    (this.form.nextOfKin1Name && typeof this.form.nextOfKin1Name === 'string' && this.form.nextOfKin1Name.trim() === '') ||
     (this.form.nextOfKin1RelationshipId && typeof this.form.nextOfKin1RelationshipId === 'string' && this.form.nextOfKin1RelationshipId.trim() === '') ||
          (this.form.nextOfKin1ContactNumber && typeof this.form.nextOfKin1ContactNumber === 'string' && this.form.nextOfKin1ContactNumber.trim() === '') ||
            (this.form.dateOfBirth && typeof this.form.dateOfBirth === 'string' && this.form.dateOfBirth.trim() === '') ;

  // Additional check for any missing fields
  if (!this.form.surname || !this.form.documentNumber || !this.form.giveName || !this.form.sex || !this.form.mobileNumber ||
      !this.formattedPatientAddress || !this.formattedMailingAddress|| !this.form.smsLanguage || !this.form.nextOfKin1Name || !this.form.nextOfKin1RelationshipId || !this.form.nextOfKin1ContactNumber || !this.form.dateOfBirth)  {
    this.isFieldInvalid = true;
  }
},


   async submitForm() {
    try {
      // Validate the field before submitting
      this.validateField();

      // If the field is invalid, don't proceed with form submission
      if (this.isFieldInvalid) {
      
        return;
      }

      if (this.formMode === 'edit') {
        // Fetch existing patient data for edit
        const patientId = this.formData.id;
        const patientData = await patientService.getPatient(patientId);

        // Merge existing data with updated formData
        const updatedPatientData = {
          ...patientData,
          ...this.flattenPayload(this.form), // Flatten the form data
          ...this.flattenPayload(this.address), // Flatten the address
        };

        // Submit the updated data
        const response = await patientService.editPatient(patientId, updatedPatientData);
        console.log('Patient updated successfully:', response);
      } else if (this.formMode === 'create') {
        // Prepare flat payload for creating a new patient
        const patientData = {
          ...this.flattenPayload(this.form), // Flatten the form data
          ...this.flattenPayload(this.address), // Flatten the address
        };

        // Submit the new patient data
        const response = await patientService.createPatient(patientData);
        console.log('Patient created successfully:', response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  },

// Helper function to flatten the payload
    flattenPayload(data) {
      const flatData = {};
      for (const key in data) {
        if (typeof data[key] === 'object' && data[key] !== null) {
          Object.assign(flatData, this.flattenPayload(data[key]));
        } else {
          flatData[key] = data[key];
        }
      }
      return flatData;
    },
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
  color: #333333 !important;

}

textarea {
  height: 80px; /* Set a smaller height for the textarea */
}

.form-control {
  padding-right: 2rem; /* Ensures space for the icon */
  font-size: 13px;
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
  top: 0%;
  left: 0%;
  right: 10%;
  bottom: 10%;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: none;
  resize: none;
  font-size: 13px;
  background-color: transparent;
  box-sizing: border-box;
}

.reason-input:focus {
  outline: none;
}
::placeholder{
   font-size: 12px;
}
h3{
   font-size: 18px;
}
h4{
  font-size: 16px;
}
h6{
   color: #7B7B7B !important;
}
.red{
   color: #EC6161!important;
   background-color: #ffffff !important;
}
.border-red {
  border: 2px solid #EC6161 !important;
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
.tab-option {
  background-color: white;
 
  transition: all 0.3s ease;
}

.tab-option.active {
  background-color: #4080DF;
  color: white;
}


</style>

