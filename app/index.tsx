import ExchVerifyOTP from "./(auth)/verifyOtp";
import ExchLoginUI from "./(auth)/loginOtp";

export default function Index() {
  return (
    <view>
      {/* <WelcomeScreen /> */}
      <ExchVerifyOTP/>
      <ExchLoginUI />
    </view>
  );
}
