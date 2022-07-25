<template>
  <div class="memo">
      <HeaderEFTG ref="headerEFTG"></HeaderEFTG>
    <div class="container">
      <br />
      <br />
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 pb-5">
          <!--Form with header-->

          <div class="card border-primary rounded-0">
            <div class="card-header p-0">
              <div class="btn-info text-white text-center py-2">
                <h3>Blurt Memo Decoder</h3>
              </div>
            </div>
            
            <div class="card-body p-3">
              <!--Body-->
            
              <div class="form-group">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Memo</div>
                  </div>
                  <textarea
                    v-model="memo"
                    class="form-control"
                    placeholder="Start with a #"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Key</div>
                  </div>
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    placeholder="Private Memo Key"
                    required
                  />
                </div>
              </div>
              <div class="text-center">
                <input
                  type="submit"
                  value="Decode"
                  class="btn btn-info btn-block rounded-0 py-2"
                  @click="decode()"
                />
              </div>
              <div class="form-group" v-if="isDecoded">
                <div class="input-group mb-2">
                  <textarea readonly
                    v-model="output"
                    class="form-control"
                    placeholder="Start with a #"
                    rows="10"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
           
          </div>

          <!--Form with header-->
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import blurt from "@blurtfoundation/blurtjs";
import HeaderEFTG from '../components/HeaderEFTG';
export default {
  data() {
    return {
      password: "",
      memo: "",
      output: "",
      isDecoded: false,
    };
  },
   components: {
    HeaderEFTG
  },
  methods: {
    decode() {
        if(this.memo===''){
            this.$alert('Please enter memo');
            return;
        }
        if(this.password===''){
            this.$alert('Please enter the private memo key');
            return;
        }
        let decoded_memo = blurt.memo.decode(this.password, this.memo);
        this.output = `Memo Decoded: \n------------------\n${decoded_memo}`;
        this.isDecoded = true;
    },
  },
  created() {
    blurt.api.setOptions({
      url: "https://rpc.blurt.world",
      useAppbaseApi: true,
    });
  },
};
</script>