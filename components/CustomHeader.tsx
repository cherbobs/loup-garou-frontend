// components/CustomHeader.tsx
import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  title: string;
};

export default function CustomHeader({ title }: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View
      style={{
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 24,
        paddingVertical: 10,
        marginTop: 24,
        marginRight: 20,
        width: "100%",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Pressable onPress={handleBack} style={{ marginRight: 12 }}>
          <Ionicons name="arrow-back-outline" size={20} color="#FDE4C5" />
        </Pressable>
        <Text
          style={{
            color: "#FDE4C5",
            fontSize: 18,
            fontFamily: "SpecialElite",
          }}
        >
          {title}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: 20,
        }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "#CF000A",
            borderWidth: 0.5,
            borderRadius: 60,
            elevation: 5,
          }}
        >
          <Image
            source={require("../assets/settings-icon.png")}
            style={{ width: 18, height: 18 }}
          />
        </View>
      </View>
    </View>
  );
}
