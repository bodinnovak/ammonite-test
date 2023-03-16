import axios from 'axios'
import { toast } from 'react-toastify'
import { PlayListGetResponse } from '../type/type'

export const getPlayList = async () => {
  try {
    const { data } = await axios<PlayListGetResponse>({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER}/playlists`,
    });
    return data;
  } catch (err: any) {
    if (err?.message) {
      toast.error(err?.message);
      throw Error(err.message);
    }
  }
};

export const createPlayList = async (form: any) => {
  try {
    const { data } = await axios<PlayListGetResponse>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER}/playlists`,
      data: {...form, visited: 0}
    });
    toast.success('A New Play List is created successfully!');
    return data;
  } catch (err: any) {
    if (err?.message) {
      throw Error(err.message);
    }
  }
};

export const playTrack = async (id: string) => {
  try {
    const { data } = await axios<PlayListGetResponse>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER}/playlists/play/${id}`,
    });
    return data;
  } catch (err: any) {
    if (err?.message) {
      throw Error(err.message);
    }
  }
};
