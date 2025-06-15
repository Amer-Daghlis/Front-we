import { getToken } from "./auth"; // Assuming getToken is in auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getLawyers(){
  const token = getToken()
  if (!token) throw new Error("No token found")

const response = await fetch(`${API_BASE_URL}/users/lawyer`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user info")
  }

  return response.json()
}

// @router.get("/lawyer", response_model=List[UserBase],summary="Get all lawyers")
// async def get_lawyers(current_user = Depends(get_current_user)) -> List[UserBase]:
//     users_collection = await get_collection("users")
    
//     lawyers = []
//     async for user in users_collection.find({"role": "lawyer"}):
//         user["id"] = str(user["_id"])
//         del user["_id"]
//         del user["hashed_password"]
//         lawyers.append(UserBase(**user))
    
//     return lawyers

export async function getTotalLawyers() {
  const token = getToken()
  if (!token) throw new Error("No token found")

  const response = await fetch(`${API_BASE_URL}/users/lawyesr/total`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch total number of lawyers")
  }

  return response.json()
}
