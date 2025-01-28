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
    <label class="mb-1" for="document-type">
      Document No.<span class="red">*</span>
    </label>
    <div class="position-relative">
      <!-- Input Field -->
      <input
        id="document-type"
        v-model="selectedDocumentDescription"
        tabIndex="44"
        placeholder="HKID"
        readonly
        :disabled="formMode === 'edit' && formFieldsDisabled"
           :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
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
          v-for="type in documentTypes"
          :key="type.id"
          class="dropdown-item"
          style="padding: 8px; cursor: pointer;"
          @click="selectOption(type)"
        >
          {{ type.description }}
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
        :disabled="formMode === 'edit' && formFieldsDisabled"
         @input="isFieldInvalid = false"  
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
          @input="isFieldInvalid = false" 
       
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
          @input="isFieldInvalid = false" 
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
       :disabled="formMode === 'edit' && formFieldsDisabled"
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
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
       :disabled="formMode === 'edit' && formFieldsDisabled"
      
       
    />
  </div>

 <div class="col-6 px-3" style="padding: 0;">
      <label class="mb-1" for="occupation">
        Occupation
      </label>
      <div class="position-relative">
        <!-- Input Field -->
        <input
          id="occupation"
          v-model="selectedOccupationDescription"
          class="form-control pr-5"
          placeholder="Free Text"
          tabIndex="36"
          readonly
          :disabled="formMode === 'edit' && formFieldsDisabled"
             :class="['form-control pr-5']"
        />
        <!-- Dropdown Icon -->
        <span
          class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
          @click="toggleOccupationDropdown"
        >
          &#9662; <!-- Downward arrow -->
        </span>
        <!-- Dropdown Menu -->
        <div
          v-show="isOccupationDropdownOpen"
          class="dropdown-menu position-absolute"
          style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
        >
          <div
            v-for="type in occupationTypes"
            :key="type.id"
            class="dropdown-item"
            style="padding: 8px; cursor: pointer;"
            @click="selectOccupation(type)"
          >
            {{ type.description }}
          </div>
        </div>
      </div>
    </div>
</div>



<div class="form-group" style="display: flex; gap: 10px;">
   <div class="col-6" style="padding: 0;">
      <label class="mb-1" for="nationality">
        Nationality<span class="red">*</span>
      </label>
      <div class="position-relative">
        <!-- Input Field -->
        <input
          id="nationality"
          v-model="selectedNationalityDescription"
          class="form-control pr-5"
          placeholder="Nationality"
          tabIndex="35"
          readonly
          :disabled="formMode === 'edit' && formFieldsDisabled"
             :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
        />
        <!-- Dropdown Icon -->
        <span
          class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
          @click="toggleNationalityDropdown"
        >
          &#9662; <!-- Downward arrow -->
        </span>
        <!-- Dropdown Menu -->
        <div
          v-show="isNationalityDropdownOpen"
          class="dropdown-menu position-absolute"
          style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
        >
          <div
            v-for="type in nationalityTypes"
            :key="type.id"
            class="dropdown-item"
            style="padding: 8px; cursor: pointer;"
            @click="selectNationality(type)"
          >
            {{ type.description }}
          </div>
        </div>
      </div>
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
       :disabled="formMode === 'edit' && formFieldsDisabled"
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
     <!-- Mobile Country Code Dropdown -->
    <div class="col-4" style="padding: 0;">
      <label class="mb-1" for="mobile-no">
        Mobile<span class="red">*</span>
      </label>
      <div class="position-relative">
        <!-- Input Field -->
        <input
          id="mobile-no"
          v-model="selectedMobileCodeDescription"
          class="form-control pr-5"
          placeholder="+852"
          tabIndex="33"
          readonly
          :disabled="formMode === 'edit' && formFieldsDisabled"
             :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
        />
        <!-- Dropdown Icon -->
        <span
          class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
          @click="toggleMobileCodeDropdown"
        >
          &#9662; <!-- Downward arrow -->
        </span>
        <!-- Dropdown Menu -->
        <div
          v-show="isMobileCodeDropdownOpen"
          class="dropdown-menu position-absolute"
          style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
        >
          <div
            v-for="code in mobileCountryCodes"
            :key="code.id"
            class="dropdown-item"
            style="padding: 8px; cursor: pointer;"
            @click="selectMobileCode(code)"
          >
            {{ code.description }}
          </div>
        </div>
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
        :disabled="formMode === 'edit' && formFieldsDisabled"
      
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
      :disabled="formMode === 'edit' && formFieldsDisabled" 
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
  :disabled="formMode === 'edit' && formFieldsDisabled"
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
       :disabled="formMode === 'edit' && formFieldsDisabled"
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
       :disabled="formMode === 'edit' && formFieldsDisabled"
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
       :disabled="formMode === 'edit' && formFieldsDisabled"
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
      type="email" 
      class="form-control" 
      placeholder="Free Text"
      tabIndex="28" 
       :disabled="formMode === 'edit' && formFieldsDisabled"
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
        :disabled="formMode === 'edit' && formFieldsDisabled"
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
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
      :disabled="formMode === 'edit' && formFieldsDisabled"
      
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
          :disabled="formMode === 'edit' && formFieldsDisabled"
         
      />
      <span 
      class="closed-btn position-absolute  cross cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
    <div class="mb-2" style="padding: 0;">
 
      <div class="position-relative">
        <!-- Input Field -->
        <input
          id="kin1-relation"
          v-model="selectedRelationshipDescription"
          class="form-control pr-5"
          placeholder="Relationship"
          tabIndex="21"
          readonly
          :disabled="formMode === 'edit' && formFieldsDisabled"
           :class="['form-control pr-5', { 'border-red': isFieldInvalid }]"
          
        />
        <!-- Dropdown Icon -->
        <span
          class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
          @click="toggleRelationshipDropdown"
        >
          &#9662; <!-- Downward arrow -->
        </span>
        <!-- Dropdown Menu -->
        <div
          v-show="isRelationshipDropdownOpen"
          class="dropdown-menu-1 position-absolute"
          style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
        >
          <div
            v-for="type in relationshipTypes"
            :key="type.id"
            class="dropdown-item"
            style="padding: 8px; cursor: pointer;"
            @click="selectRelationship(type)"
          >
            {{ type.description }}
          </div>
        </div>
      </div>
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
          :disabled="formMode === 'edit' && formFieldsDisabled"
         
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
         :disabled="formMode === 'edit' && formFieldsDisabled"
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
        :disabled="formMode === 'edit' && formFieldsDisabled"
         
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
         :disabled="formMode === 'edit' && formFieldsDisabled"
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
   <div class="mb-2" style="padding: 0;">
 
      <div class="position-relative">
        <!-- Input Field -->
        <input
          id="kin1-relation"
          v-model="selectedKin2RelationshipDescription"
          class="form-control pr-5"
          placeholder="Relationship"
          tabIndex="16"
          readonly
          :disabled="formMode === 'edit' && formFieldsDisabled"
        />
        <!-- Dropdown Icon -->
        <span
          class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
          @click="toggleKin2RelationshipDropdown"
        >
          &#9662; <!-- Downward arrow -->
        </span>
        <!-- Dropdown Menu -->
        <div
          v-show="isKin2RelationshipDropdownOpen"
          class="dropdown-menu-2 position-absolute"
          style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
        >
          <div
            v-for="type in relationshipKin2Types"
            :key="type.id"
            class="dropdown-item"
            style="padding: 8px; cursor: pointer;"
            @click="selectKin2Relationship(type)"
          >
            {{ type.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="form-group mb-2 position-relative">
      
      <input 
        id="kin2-contact" 
        v-model="form.nextOfKin2ContactNumber" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        tabIndex="15" 
         :disabled="formMode === 'edit' && formFieldsDisabled"
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
        :disabled="formMode === 'edit' && formFieldsDisabled" 
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
         :disabled="formMode === 'edit' && formFieldsDisabled"
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
         :disabled="formMode === 'edit' && formFieldsDisabled"
      />
      <span 
      class="closed-btn position-absolute  cross top-50 end-0 translate-middle-y cursor-pointer"
  
    >
      &times;
    </span>
    </div>
   <div class="mb-2" style="padding: 0;">
 
      <div class="position-relative">
        <!-- Input Field -->
        <input
          id="kin1-relation"
          v-model="selectedKin3RelationshipDescription"
          class="form-control pr-5"
          placeholder="Relationship"
          tabIndex="11"
          readonly
          :disabled="formMode === 'edit' && formFieldsDisabled"
        />
        <!-- Dropdown Icon -->
        <span
          class="position-absolute top-50 end-0 translate-middle-y cursor-pointer"
          @click="toggleKin3RelationshipDropdown"
        >
          &#9662; <!-- Downward arrow -->
        </span>
        <!-- Dropdown Menu -->
        <div
          v-show="isKin3RelationshipDropdownOpen"
          class="dropdown-menu-3 position-absolute"
          style="top: 100%; right: 0; z-index: 1; background: white; border: 1px solid #ccc; border-radius: 4px; min-width: 100%;"
        >
          <div
            v-for="type in relationshipKin3Types"
            :key="type.id"
            class="dropdown-item"
            style="padding: 8px; cursor: pointer;"
            @click="selectKin3Relationship(type)"
          >
            {{ type.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="form-group mb-2 position-relative">
     
      <input 
        id="kin3-contact" 
        v-model="form.nextOfKin3ContactNumber" 
        type="text" 
        class="form-control" 
        placeholder="Contact Number"
        tabIndex="10" 
         :disabled="formMode === 'edit' && formFieldsDisabled"
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
         :disabled="formMode === 'edit' && formFieldsDisabled"
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
         :disabled="formMode === 'edit' && formFieldsDisabled"
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
    :disabled="formMode === 'edit' && formFieldsDisabled"
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
    :disabled="formMode === 'edit' && formFieldsDisabled"
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
    :disabled="formMode === 'edit' && formFieldsDisabled"
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
    
      <textarea id="outstandingReason" v-modal="form.outstandingBillReason" :disabled="formMode === 'edit' && formFieldsDisabled" tabIndex="5" class="reason-input" placeholder="Reason"></textarea>
    </div>
  </div>
  <div class="col-6">
    <div class="reason-box">
    
      <textarea  id="personaReason" v-model="form.personaNonGrataReason" :disabled="formMode === 'edit' && formFieldsDisabled"  class="reason-input" tabIndex="3"  placeholder="Reason"></textarea>
    </div>
  </div>
</div>

              </div>

             
            </div>

<!-- Confirmation Modal with Modal Overlay -->
<div v-if="showConfirmationPopup" class="modal-overlay">
  <div id="confirmationModal" class="modal fade" tabindex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true" style="font-size:18px;">
    <div class="modal-dialog">
      <div class="modal-content" style="width: 100%;">
        <div class="modal-header" style="border:none">
          <h5 id="confirmationModalLabel" class="modal-title">Confirmation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeConfirmationPopup"></button>
        </div>
        <div class="modal-body" style="font-size: medium;">
          <p>Are you sure to cancel without save?</p>
        </div>
        <div class="modal-footer d-flex justify-end">
          <button type="button" class="btn btn-outline-secondary cancel-btn rounded-xl" data-bs-dismiss="modal" @click="closeConfirmationPopup">Back</button>
       <button  type="submit" class="save-btn ms-2 rounded-xl" @click="cancelFormChanges">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Toast Container with Modal Overlay -->
<!-- Toast Container with Modal Overlay -->
<div
  v-if="showToast"
  class="modal-overlay position-fixed d-flex justify-content-center align-items-center"
  aria-live="polite"
  aria-atomic="true"
  style="z-index: 1050; background: rgba(0, 0, 0, 0.5);"
>
  <div
    class="modal-dialog modal-dialog-centered"
    style="
      position: fixed;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 400px;
      width: 100%;
      margin-bottom: 20px;
    "
  >
    <div
      class="card border-0 shadow rounded-xl"
      style="background: white;"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex flex-column align-items-center">
        <!-- Heading -->
        <div class="toast-header border-0 py-3 d-flex justify-start w-100">
          <h5
            class="m-0"
            :class="toastType === 'success' ? 'text-primary' : 'text-danger'"
            style="flex-grow: 1; font-size: 16px;"
          >
            {{ toastHeading }}
          </h5>
        </div>
        <!-- Text Content -->
        <div
          class="toast-body py-2 px-3 text-center" style="font-size: 14px;"
          :class="toastType === 'success' ? 'text-primary' : 'text-danger'"
        >
          <p class="mb-0">{{ toastMessage }}</p>
        </div>
      </div>
      <!-- Blue Timer Line -->
      <div
        class="timer-line"
        style="
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: #007bff;
          animation: timer 3s linear forwards;
        "
      ></div>
    </div>
  </div>
</div>





            <!-- Button Section -->
<div class="form-group d-flex justify-end">
  <!-- Create Mode: Cancel and Save buttons -->
  <button v-if="formMode === 'create'" tabIndex="2" type="button" class="cancel-btn rounded-xl" @click="closeForm">Cancel</button>
  <button v-if="formMode === 'create'" tabIndex="1" type="button" class="save-btn ms-2 rounded-xl d-flex align-items-center" @click="submitForm">
    <img src="js/assets/icons/Picture14.svg" alt="Save Icon" class="me-2" style="width: 20px;" />
    <span>Save</span>
  </button>

  <!-- Edit Mode: Initially show Edit and Cancel buttons -->
  <button v-if="formMode === 'edit' && !isEditing" type="button" class="btn btn-outline-primary me-auto editBtn d-flex align-items-center" @click="startEditing">
    <img src="js/assets/icons/Picture13.svg" alt="Edit Icon" class="me-2" style="width: 25px;" />
    <span>Edit</span>
  </button>

 

  <!-- Cancel button for both Create and Edit modes -->
  <button v-if="formMode === 'edit'" type="button" class="cancel-btn rounded-xl" @click="confirmCancel">Cancel</button>

   <!-- Edit Mode: Show Save and Cancel buttons after clicking Edit -->
  <button v-if="formMode === 'edit' && isEditing" type="button" class="save-btn ms-2 rounded-xl d-flex align-items-center" @click="submitForm">
    <img src="js/assets/icons/Picture14.svg" alt="Save Icon" class="me-2" style="width: 20px;" />
    <span>Save</span>
  </button>
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
    mode: String,
    patient: Object,
    patientId: String,  // Add the patientId prop
  },
  data() {
    return {
      
       toastMessage: '',
      toastHeading: '',
      toastType: '',
        selectedMobileCode: '+852',
          selectedNationality: '',
           selectedOccupation: '',
            selectedRelationship: '',
            selectedKin2Relationship: '',
                selectedKin3Relationship: '',
        mobileCountryCodes: [
        { id: 1, code: '+852' },
        { id: 2, code: '+1' },
        { id: 3, code: '+44' },
        { id: 4, code: '+91' },
      ],
        nationalityTypes: [],
        occupationTypes: [],
         relationshipTypes: [],
          relationshipKin2Types: [],
            relationshipKin3Types: [],
      isMobileCodeDropdownOpen: false,
        isNationalityDropdownOpen: false,
         isOccupationDropdownOpen: false,
         isRelationshipDropdownOpen: false,
         isKin2RelationshipDropdownOpen: false,
          isKin3RelationshipDropdownOpen: false,
        documentTypes: [], 
          showToast: false, 
          showUpdatedToast: false,// Controls toast visibility
    toastTimeout: null,
      showConfirmationPopup: false,
          isFieldInvalid: false,
          isEditing: false, // Tracks whether the user is editing in 'edit' mode
    formFieldsDisabled: true,
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
     // Dynamic styles based on toast type
    toastStyle() {
      return this.toastType === 'error' ? { backgroundColor: 'rgba(255, 0, 0, 0.8)' } : { backgroundColor: 'rgba(0, 123, 255, 0.8)' };
    },
    toastHeadingClass() {
      return this.toastType === 'error' ? 'text-danger' : 'text-primary';
    },
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
  mounted() {
    // Fetch document types when the component is mounted
    this.fetchDocumentTypes();
    this.fetchMobileCodes();
    this.fetchNationalityTypes();
    this.fetchOccuptionTypes();
    this.fetchRelationshipTypes();
    this.fetchKin2RelationshipTypes();
    this.fetchKin3RelationshipTypes();
  },

  methods: {
    // Show a toast message with a dynamic heading and message
    showDynamicToast(type, heading, message) {
      this.toastType = type; // Set the toast type (success or error)
      this.toastHeading = heading; // Set the toast heading
      this.toastMessage = message; // Set the toast message
      this.showToast = true;

      // Hide the toast after a delay
      setTimeout(() => {
        this.showToast = false;
      }, 3500); // 3.5 seconds
    },
  
    // Fetch document types using the function from patient.js
    async fetchDocumentTypes() {
      try {
        const data = await patientService.getDocumentTypes();
        this.documentTypes = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
      async fetchMobileCodes() {
      try {
        const data = await patientService.getMobileCountryCodes();
        this.mobileCountryCodes = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
    async fetchNationalityTypes() {
      try {
        const data = await patientService.getNationalityTypes();
        this.nationalityTypes = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
     async fetchOccuptionTypes() {
      try {
        const data = await patientService.getOccupationTypes();
        this.occupationTypes = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
     async fetchRelationshipTypes() {
      try {
        const data = await patientService.getRelationshipTypes();
        this.relationshipTypes = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
    async fetchKin2RelationshipTypes() {
      try {
        const data = await patientService.getRelationshipTypes();
        this.relationshipKin2Types = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
    async fetchKin3RelationshipTypes() {
      try {
        const data = await patientService.getRelationshipTypes();
        this.relationshipKin3Types = data;
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    },
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
selectMobileCode(code) {
  this.selectedMobileCode = code;
  this.formData.mobileCountryCodeId = code.id;  // Set the mobileCountryCodeId to the code's id
  
  // Store the description for display purposes
  this.selectedMobileCodeDescription = code.description; // Update the description (assuming code has a description)
  this.isMobileCodeDropdownOpen = false;
},

selectNationality(type) {
  this.selectedNationality = type;
  this.formData.nationalityId = type.id;  // Set the nationalityId to the type's id
  
  // Store the description for display purposes
  this.selectedNationalityDescription = type.description; // Update the description (assuming type has a description)
  this.isNationalityDropdownOpen = false;
},

selectOccupation(type) {
  this.selectedOccupation = type;
  
  // Store the description for display purposes
  this.selectedOccupationDescription = type.description; // Update the description (assuming type has a description)
  this.isOccupationDropdownOpen = false;
},

selectRelationship(type) {
  this.selectedRelationship = type;
  this.formData.nextOfKin1RelationshipId = type.id;  // Set the nextOfKin1RelationshipId to the type's id
  
  // Store the description for display purposes
  this.selectedRelationshipDescription = type.description; // Update the description (assuming type has a description)
  this.isRelationshipDropdownOpen = false;
},

selectKin2Relationship(type) {
  this.selectedKin2Relationship = type;
  this.formData.nextOfKin2RelationshipId = type.id;  // Set the nextOfKin2RelationshipId to the type's id
  
  // Store the description for display purposes
  this.selectedKin2RelationshipDescription = type.description; // Update the description (assuming type has a description)
  this.isKin2RelationshipDropdownOpen = false;
},

selectKin3Relationship(type) {
  this.selectedKin3Relationship = type;
  this.formData.nextOfKin3RelationshipId = type.id;  // Set the nextOfKin3RelationshipId to the type's id
  
  // Store the description for display purposes
  this.selectedKin3RelationshipDescription = type.description; // Update the description (assuming type has a description)
  this.isKin3RelationshipDropdownOpen = false;
}
,
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
     // Toggle MobileCode dropdown visibility
    toggleMobileCodeDropdown() {
      this.isMobileCodeDropdownOpen = !this.isMobileCodeDropdownOpen;
   
    },
     toggleNationalityDropdown() {
      this.isNationalityDropdownOpen = !this.isNationalityDropdownOpen;
   
    },
     toggleOccupationDropdown() {
      this.isOccupationDropdownOpen = !this.isOccupationDropdownOpen;
   
    },
     toggleRelationshipDropdown() {
      this.isRelationshipDropdownOpen = !this.isRelationshipDropdownOpen;
   
    },
    toggleKin2RelationshipDropdown() {
      this.isKin2RelationshipDropdownOpen = !this.isKin2RelationshipDropdownOpen;
   
    },
     toggleKin3RelationshipDropdown() {
      this.isKin3RelationshipDropdownOpen = !this.isKin3RelationshipDropdownOpen;
   
    },
    
    selectOption(type) {
      this.selectedOption = type;
        this.formData.documentTypeId = type.id;

    // Optionally store the description for display purposes
    this.selectedDocumentDescription = type.description;
      this.isDropdownOpen = false;
    },
     saveAddress(updatedAddress) {
      this.address = updatedAddress;
      this.isAddressModalOpen = false;
    },
validateField() {
  // Initialize isFieldInvalid as false for all fields
  this.isFieldInvalid = false;

  // Define all the form fields that need to be validated
  const requiredFields = [
    'surname',
    'documentNumber',
    'givenName',
    'sex',
    'mobileNumber',
    'smsLanguage',
    'nextOfKin1Name',
    'nextOfKin1ContactNumber',
    'dateOfBirth'
  ];

  // // Define the address fields if they are in a nested object (adjust as necessary)
  // const addressFields = [
  //   'formattedPatientAddress',
  //   'formattedMailingAddress'
  // ];

  // Combine all fields to check
  const allFields = [...requiredFields];

  // Loop through the fields and check if any is invalid
  for (const field of allFields) {
    const fieldValue = this.form[field];
    if (!fieldValue || fieldValue.trim() === '') {
      this.isFieldInvalid = true;
      console.log(`${field} is invalid`);
      break; // Exit loop once invalid field is found
    }
  }

  if (this.isFieldInvalid) {
    console.log('Form validation failed.');
  }
}


,
 // Method to cancel the form and show confirmation popup≈
  confirmCancel() {
    if (this.isEditing) {
      this.showConfirmationPopup = true; // Show the confirmation dialog when editing
    } else {
      this.closeForm(); // Close the form immediately in create mode
    }
  },
   // Method to close the confirmation popup without canceling
  closeConfirmationPopup() {
    this.showConfirmationPopup = false; // Close the confirmation dialog
  },

  // Method to confirm cancellation (discard changes)
  cancelFormChanges() {
    this.closeForm(); // Reset form and close confirmation
    this.showConfirmationPopup = false; // Close the confirmation dialog
  },
  showSuccessToast() {
    this.showToast = true;

    // Automatically hide the toast after 3 seconds
    this.toastTimeout = setTimeout(() => {
      this.closeToast();
    }, 1000);
  },
  showUpdatedSuccessToast() {
    this.showUpdatedToast = true;

    // Automatically hide the toast after 3 seconds
    this.toastTimeout = setTimeout(() => {
      this.closeUpdatedToast();
    }, 1000);
  },


  // Close the toast and clear the timer
  closeToast() {
    this.showToast = false;

    // Clear the timeout to prevent any pending timer issues
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  },
  
  closeUpdatedToast() {
    this.showUpdatedToast = false;

    // Clear the timeout to prevent any pending timer issues
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  },


 


async submitForm() {
  try {
    this.isFieldInvalid = false;

    // Validate fields for 'create' mode
    if (this.formMode === 'create || edit') {
      this.validateField();

      if (this.isFieldInvalid) {
        console.log('Form validation failed.');
        return; // If the fields are invalid, don't proceed
      }
    }
    
    const payload = {
      ...this.flattenPayload(this.form),
      ...this.flattenPayload(this.address),
      documentTypeId: this.formData.documentTypeId,
      mobileCountryCodeId: this.formData.mobileCountryCodeId,  // Include mobile country code ID
      nationalityId: this.formData.nationalityId,  // Include nationality ID
      nextOfKin1RelationshipId: this.formData.nextOfKin1RelationshipId,  // Include relationship ID
    };

    let response;

    // Handle data submission for 'edit' mode
    if (this.formMode === 'edit') {
      const patientId = this.patientId;
      const patientData = await patientService.getPatient(patientId);

      const updatedPatientData = {
        ...patientData,
        ...payload, // Include the updated payload with IDs
      };

      response = await patientService.editPatient(patientId, updatedPatientData);
    } else if (this.formMode === 'create') {
      // Create new patient data
      response = await patientService.createPatient(payload);
    }

    // If response is null or undefined, show success toast as fallback
    if (!response) {
      console.error('Response is null or undefined, showing default success toast');
      this.showDynamicToast(
        'success',
        this.formMode === 'create' ? 'Patient Created' : 'Patient Profile Updated',
        this.formMode === 'create' ? 'Patient is created successfully!' : 'Patient profile has been updated.',
        
      );
      // Close the modal after a short delay (e.g., 500ms)
  setTimeout(() => {
   this.closeForm();
  }, 3000);
    } else {
      // Handle different status codes with dynamic messages from the response
      if (response.status === 204 || response.status === 200) {
        console.log('Patient saved successfully');
        const successMessage = response.body?.message || 'Operation was successful.';
        this.closeForm();
        this.isModalOpen = false;
        this.showDynamicToast(
          'success',
          this.formMode === 'create' ? 'Patient Created' : 'Patient Profile Updated',
          successMessage
        );
      } else if (response.status === 422) {
        // Handle the specific 422 status code for duplicate document number
        const errorMessage = response.body?.message || 'This patient was already registered.';
        console.error('Duplicate document number:', errorMessage);
        this.showDynamicToast(
          'error',
          'Duplicate Document Number',
          errorMessage
        );
      } else {
        // Handle unexpected response statuses and display dynamic error message
        const errorMessage = response.body?.message || 'Duplicate document number! This patient was already registered';
        console.error('Unexpected response:', response);
        this.showDynamicToast(
          'error',
          'Error',
          errorMessage,
           'Duplicate document number! This patient was already registered'
        );
      }
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    // Show error toast on failure
    this.showDynamicToast(
      'error',
      'Error',
      'Duplicate document number! This patient was already registered'
    );
  }
}
,






  // Method to enable editing mode (unlock fields)
  startEditing() {
    this.isEditing = true; // Switch to editing state
    this.formMode = 'edit'; // Ensure we are in edit mode
    this.formFieldsDisabled = false; // Enable the form fields for editing
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

.dropdown-menu-1{
      top: 41% !important;
    right: 530px !important;
    z-index: 1;
    border-radius: 4px;
    min-width: 0% !important;
    position: fixed !important;
    overflow-y: scroll;
    height: 100px;

}
.dropdown-menu-2{
      top: 41% !important;
    right: 530px !important;
    z-index: 1;
    border-radius: 4px;
    min-width: 0% !important;
    position: fixed !important;
    overflow-y: scroll;
    height: 100px;

}
.dropdown-menu-3{
      top: 41% !important;
    right: 530px !important;
    z-index: 1;
    border-radius: 4px;
    min-width: 0% !important;
    position: fixed !important;
    overflow-y: scroll;
    height: 100px;

}
</style>

