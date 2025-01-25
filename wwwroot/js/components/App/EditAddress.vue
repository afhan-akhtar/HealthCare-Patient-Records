<template>
  <div v-if="isAddressModalOpen" class="modal-overlay">
    <div :class="modalContentClass" class="modal-content">
      <div class="modal-header pb-2">
        <h3>Address Input</h3>
        <button   tabindex="-1" class="close-btn" @click="closeForm">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-12">
              <h4 class="mb-3">Mailing Address Option</h4>
              <div class="form-group row">
                <div class="col-12">
                  <div class="form-check d-flex align-items-center">
                    <input 
                      id="separate-mailing-address" 
                      v-model="isSeparateMailingAddress" 
                      type="checkbox" 
                      class="form-check-input"
                      style="width: auto;"
                    />
                    <label for="separate-mailing-address" class="form-check-label ml-2">
                      Separate Mailing Address
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Left column: Address -->
            <div :class="isSeparateMailingAddress ? 'col-12 col-md-6' : 'col-12'">
              <h5 class="mb-3">Address</h5>
              <div class="form-group row">
                <div class="col-6">
                  <label for="zone">Zone</label>
                  <input 
                  
                    id="zone" 
                     v-model="address.residentStructureAddressZone"
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                   
                  />
                </div>
                <div class="col-6">
                  <label for="district">District</label>
                  <input 
                    id="district" 
                                    v-model="address.residentStructureAddressDistrict"

                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="sub-district">Sub-District</label>
                  <input
                    id="sub-district"
                    class="form-control pr-5"
                    placeholder="Free Text"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="village">Street</label>
                  <input
                    id="village"
                    class="form-control pr-5"
                    placeholder="Free Text"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="village">Village</label>
                  <input 
                    id="village" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="estate">Estate</label>
                  <input 
                    id="estate" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="block-building">Block/ Building Others (Non-Residential)</label>
                  <input 
                    id="block-building" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
              </div>
              <!-- Floor and Flat Inputs -->
              <div class="form-group row">
                <div class="col-6">
                  <label for="floor">Floor</label>
                  <input 
                    id="floor" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Floor"
                  />
                </div>
                <div class="col-6">
                  <label for="flat">Flat</label>
                  <input 
                    id="flat" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Flat"
                  />
                </div>
              </div>
            </div>

            <!-- Conditional Mailing Address -->
            <div v-if="isSeparateMailingAddress" class="col-12 col-md-6">
              <h5 class="mb-3">Mailing Address</h5>

              <!-- Mailing Address Fields -->
              <div class="form-group row">
                <div class="col-6">
                  <label for="mailing-zone">Zone</label>
                  <input 
                    id="mailing-zone" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
                <div class="col-6">
                  <label for="mailing-district">District</label>
                  <input 
                    id="mailing-district" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="mailing-sub-district">Sub-District</label>
                  <input
                    id="mailing-sub-district"
                    class="form-control pr-5"
                    placeholder="Free Text"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="mailing-village">Street</label>
                  <input
                    id="mailing-village"
                    class="form-control pr-5"
                    placeholder="Free Text"
                    required
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="mailing-village">Village</label>
                  <input 
                    id="mailing-village" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="mailing-estate">Estate</label>
                  <input 
                    id="mailing-estate" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-12">
                  <label for="mailing-block-building">Block/ Building Others (Non-Residential)</label>
                  <input 
                    id="mailing-block-building" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Free Text"
                  />
                </div>
              </div>
              <!-- Floor and Flat Inputs -->
              <div class="form-group row">
                <div class="col-6">
                  <label for="mailing-floor">Floor</label>
                  <input 
                    id="mailing-floor" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Floor"
                  />
                </div>
                <div class="col-6">
                  <label for="mailing-flat">Flat</label>
                  <input 
                    id="mailing-flat" 
                    type="text" 
                    class="form-control pr-5" 
                    placeholder="Flat"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Button Section -->
          <div class="form-group d-flex justify-end">
            <button    tabindex="-1" type="button" class="cancel-btn rounded-xl" @click="closeForm">Cancel</button>
            <button  type="submit" class="save-btn ms-2 rounded-xl" @click="submitForm">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAddressModalOpen: true,
      isSeparateMailingAddress: false, // Tracks the state of the checkbox
    };
  },
  computed: {
    modalContentClass() {
      return this.isSeparateMailingAddress ? 'modal-content' : 'modal-content narrow'; // Adjusts the modal width based on checkbox state
    },
  },
  methods: {
    closeForm() {
      this.$emit('close'); // Close modal
    },
    submitForm() {
      this.$emit('save', this.address); // Emit the updated address to the parent component
    }
  },
};
</script>

<style scoped>
input, textarea {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;
}

textarea {
  height: 80px;
}

.form-control {
  padding-right: 2rem;
  font-size: 0.875rem;
  height: 36px;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
}

.cursor-pointer {
  cursor: pointer;
}

.submit-btn {
  font-size: 0.875rem;
  padding: 8px 12px;
}

.form-group {
   margin-bottom: 0px;
}

.col-6 {
   padding-top: 0px !important;
}

label {
   font-size: 12px;
   color: #7B7B7B;
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
    max-height: 90%;
    width: 80%;
    background-color: white;
    padding: 20px;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}

.modal-content.narrow {
    width: 50%; /* Reduced width when only one column is visible */
}
</style>
