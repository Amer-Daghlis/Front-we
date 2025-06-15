import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // إذا لم يكن التوكن موجودًا، أعد التوجيه إلى صفحة تسجيل الدخول
        router.push("/sign-in");
        return;
      }

      try {
        // تحقق من صلاحية التوكن
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("accessToken"); // إزالة التوكن إذا انتهت صلاحيته
          router.push("/sign-in");
        } else {
          setIsAuthenticated(true); // التوكن صالح
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("accessToken");
        router.push("/sign-in");
      }
    }, [router]);

    if (!isAuthenticated) {
      return null; // عرض شاشة فارغة أثناء التحقق
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;