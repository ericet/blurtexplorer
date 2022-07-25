<template>
  <div>
    <HeaderEFTG ref="headerEFTG"></HeaderEFTG>

    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\probit.jpg" alt="..." />
            </div>
            <div class="info">
              <h3>Probit</h3>
              <a
                href="https://www.probit.com/app/exchange/BLURT-BTC"
                class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\ionomy.png" alt="..." />
            </div>
            <div class="info">
              <h3>Ionomy</h3>
              <a
                href="https://ionomy.com/en/markets/btc-blurt"
                class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\beldex.jpg" alt="..." />
            </div>
            <div class="info">
              <h3>Beldex</h3>
              <a
                href="https://www.beldex.io/tradeAdvance?pair=BLURT_BTC"
                class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\stex.png" alt="..." />
            </div>
            <div class="info">
              <h3>STEX</h3>
              <a
                href="https://app.stex.com/en/trade/pair/BTC/BLURT/1D"
                class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\hive-engine.png" alt="..." />
            </div>
            <div class="info">
              <h3>Hive Engine</h3>
              <a
                href="https://hive-engine.com/?p=market&t=BLURT"
                class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\steem-engine.jpg" alt="..." />
            </div>
            <div class="info">
              <h3>Steem-Engine</h3>
              <a
                href="https://steem-engine.com/?p=market&t=BLURT"
                class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\leodex.png" alt="..." />
            </div>
            <div class="info">
              <h3>LEODEX</h3>
              <a href="https://leodex.io/market/BLURT" class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="box card">
            <div class="box cardImg">
              <img src="..\assets\blurt-logo.png" alt="..." />
            </div>
            <div class="info">
              <h3>WBLURT</h3>
              <a href="https://blurtswap.io/" class="btn btn-primary"
                >Trade Now</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderEFTG from "@/components/HeaderEFTG";
export default {
  name: "Exchanges",
  components: {
    HeaderEFTG,
  }
}
</script>
<style scoped>
.box {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
.card {
  margin-top: 80px;
  height: 300px;
  transition: 0.5s;
}
.card:hover {
  border: 1px solid red;
  border-radius: 30px;
}
.card .cardImg {
  height: 150px;
  width: 90%;
  position: relative;
  top: -15px;
  left: 5%;
}
.card .cardImg img {
  width: 100%;
  height: 100%;
}

.card .info {
  text-align: center;
}
.card .info h3 {
  color: rgb(70, 66, 66);
}
.card .info p {
  color: rgb(41, 201, 49);
}

.ligne {
  display: flex;
}
</style>
