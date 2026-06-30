import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Button } from '../ui/button';

const defaultValues = {
  name: '',
  type: 'indoor',
  location: '',
  price_per_hour: '',
  description: '',
  image_url: '',
  status: 'available'
};

export default function CourtForm({ initialValues, onSubmit, submitLabel = 'Save Court' }) {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSubmitting(true);
    try {
      await onSubmit({ ...form, price_per_hour: Number(form.price_per_hour) });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal menyimpan data.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_220px] md:p-8">
          <div className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Nama Lapangan</Label>
                <Input id="name" name="name" placeholder="cth. RallyCourt Indoor A" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="type">Tipe</Label>
                <Select id="type" name="type" value={form.type} onChange={handleChange}>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" name="location" placeholder="cth. Bandung" value={form.location} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="price_per_hour">Harga per Jam (Rp)</Label>
                <Input id="price_per_hour" name="price_per_hour" type="number" placeholder="150000" value={form.price_per_hour} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select id="status" name="status" value={form.status} onChange={handleChange}>
                  <option value="available">Available</option>
                  <option value="maintenance">Maintenance</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="image_url">URL Gambar</Label>
                <Input id="image_url" name="image_url" placeholder="https://..." value={form.image_url} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" rows={4} placeholder="Deskripsi singkat lapangan" value={form.description} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>Preview</Label>
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-soft">
              {form.image_url ? (
                <img src={form.image_url} alt="Preview lapangan" className="h-full w-full object-cover" />
              ) : (
                <ImageOff className="h-8 w-8 text-gray-300" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-5 flex items-center gap-4">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </Button>
        {message && <p className="text-sm font-bold text-red-600">{message}</p>}
      </div>
    </form>
  );
}
