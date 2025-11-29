import { Link, useNavigate } from "react-router"
import { User, Mail, Lock, IdCard, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { useForm } from 'react-hook-form'
import { authRegister, type RegisterData } from "@/services/apiAuth"
import { toast } from "sonner"

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

function Register() {

  const navigate = useNavigate();

  // ตั้ง title หน้า
  useEffect(() => {
    document.title = "Register | Hongsa Power RTMS"
  }, [])

  // การใช้ React Hook Form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()

  const password = watch("password")

  const onSubmit = async (data: RegisterData) => {
    console.log(data);
    try{
      await authRegister(data);
      toast.success("ลงทะเบียนสำเร็จ", {
          description: "บัญชีของคุณถูกสร้างเรียบร้อยแล้ว",
      })
      navigate("/auth/login");
    }
    catch(error){
      const errorMessage = (error as any).response?.data?.message || "เกิดข้อผิดพลาดในการลงทะเบียน";
      toast.error("ลงทะเบียนไม่สำเร็จ", {
          description: errorMessage,
      })
    }
  }

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">สร้างบัญชีใหม่</h1>
        <p className="text-sm text-slate-500">
          สมัครสมาชิกเพื่อเริ่มใช้งานระบบ Forecasting
        </p>
      </div>

      <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ชื่อ (First Name)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  className={`pl-10 ${errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="ชื่อ"
                  {...register("firstName", {required: "กรุณาระบุชื่อ"})}
                />
              </div>
              {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>นามสกุล (Last Name)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  className={`pl-10 ${errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="นามสกุล"
                  {...register("lastName", {required: "กรุณาระบุนามสกุล"})}
                />
              </div>
              {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>รหัสพนักงาน (Employee ID)</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  className={`pl-10 ${errors.employeeId ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="พนักงาน"
                  {...register("employeeId", {required: "กรุณาระบุรหัสพนักงาน"})}
                />
              </div>
              {errors.employeeId && <p className="text-sm text-red-600 mt-1">{errors.employeeId.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>แผนก (Department Name)</Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input className={`pl-10 ${errors.departmentName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="แผนก"
                  {...register("departmentName", {required: "กรุณาระบุแผนก"})}
                />
              </div>
              {errors.departmentName && <p className="text-sm text-red-600 mt-1">{errors.departmentName.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>ชื่อผู้ใช้งาน (Username)</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  className={`pl-10 ${errors.username ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  placeholder="ชื่อผู้ใช้งาน"
                  {...register("username", {required: "กรุณาระบุชื่อผู้ใช้งาน"})}
                />
              </div>
              {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>อีเมล</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  className={`pl-10 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {required: "กรุณาระบุอีเมล"})}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>รหัสผ่าน</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input
                  className={`pl-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {required: "กรุณาระบุรหัสผ่าน"})}
                />
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message as string}</p>}
            </div>
            <div className="space-y-2">
              <Label>ยืนยันรหัสผ่าน</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input 
                  id="confirmPassword" 
                  {
                      ...register("confirmPassword", { 
                      required: "ยืนยันรหัสผ่านของคุณ",
                      validate: value => value === password || "รหัสผ่านไม่ตรงกัน"
                    })
                  } 
                  className={`pl-10 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`} 
                  type="password" placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message as string}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
          สมัครสมาชิก
        </Button>

        </form>
      </div>

      <div className="text-center text-sm">
        มีบัญชีอยู่แล้ว?{" "}
        <Button variant="link" asChild>
          <Link to="/auth/login">
            เข้าสู่ระบบ
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Register