import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;              // الاتصال النهائي بقاعدة البيانات (لو تم بالفعل)
  promise: Promise<Mongoose> | null;  // وعد بإنشاء الاتصال (لو جاري إنشاؤه)
}

// محاولة استرجاع الاتصال المخزن مسبقًا من كائن global
let cached: MongooseConnection = (global as any).mongoose;

// لو مفيش كاش موجود في global، ننشئه لأول مرة
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null
  };
}

// دالة الاتصال بقاعدة البيانات - يتم استدعاؤها مرة واحدة وتُعيد نفس الاتصال في كل مرة
export const connectToDatabase = async () => {
  // لو الاتصال موجود مسبقًا، نُعيده مباشرة
  if (cached.conn) return cached.conn;

  // لو MONGODB_URL مش متعرفة في البيئة، نرمي خطأ
  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  // لو مفيش وعد سابق بالاتصال، نبدأ اتصال جديد ونخزنه كـ promise
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'imaginify',         // اسم قاعدة البيانات
      bufferCommands: false        // تعطيل تخزين الأوامر مؤقتًا (يفيد في منع أخطاء وقت التوقف)
    });

  // ننتظر تنفيذ الاتصال ونخزّنه في conn
  cached.conn = await cached.promise;

  // نعيد الاتصال النهائي
  return cached.conn;
};
