import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL; 
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

// GET Obtener lista de repositorios 
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
      },
    });

    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      owner: repo.owner ? repo.owner.login : null,
      description: repo.description ? repo.description : null,
      imageUrl: repo.owner ? repo.owner.avatar_url : null,
      language: repo.language ? repo.language : null,
    }));

    return repositories;

  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

// POST Crear repositorio 
export const createRepository = async (name: string, description: string): Promise<void> => {
  try {
    const body = {
      name,
      description,
      private: false,
    };

    const response = await axios.post(
      `${GITHUB_API_URL}/user/repos`,
      body,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Repository created:", response.data);

  } catch (error: any) {
    console.error("Error creating repository:", error.response?.data || error.message);
    throw error; 
  }
};

// GET Obtener Info de Usuario 
export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`,{
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`
      }
    })
    return response.data;
  } catch (error){
    console.error("Error recuperando usuario:", error);
    return null
  }
}

// PATCH: Editar repositorio 
// Devuelve true si tuvo éxito, false si falló
export const updateRepository = async (
  owner: string, 
  repoName: string, 
  newName?: string, 
  newDescription?: string
): Promise<boolean> => {
  try {
    const body: any = {};
    if (newName) body.name = newName;
    if (newDescription) body.description = newDescription;

    await axios.patch(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    return true; 
  } catch (error: any) {
    console.error("Error updating repository:", error.response?.data || error.message);
    return false; 
  }
};

// DELETE: Borrar repositorio 
// Devuelve true si tuvo éxito, false si falló
export const deleteRepository = async (owner: string, repoName: string): Promise<boolean> => {
  try {
    await axios.delete(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        },
      }
    );

    return true; 
  } catch (error: any) {
    console.error("Error deleting repository:", error.response?.data || error.message);
    return false; 
  }
};