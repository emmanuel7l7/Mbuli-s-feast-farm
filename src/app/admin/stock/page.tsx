
'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
};

const initialProducts: Product[] = [
  { id: "PROD-001", name: "Whole Chicken", description: "Fresh, farm-raised whole chicken. Perfect for roasting. Approx. 1.5kg.", price: 15000, stock: 120, image: "https://placehold.co/600x400", status: "in-stock" },
  { id: "PROD-002", name: "Chicken Thighs (1kg)", description: "Juicy and tender chicken thighs, bone-in and skin-on. Ideal for grilling or stewing.", price: 18000, stock: 80, image: "https://placehold.co/600x400", status: "in-stock" },
  { id: "PROD-003", name: "Chicken Wings (1kg)", description: "Perfectly portioned wings, ready for your favorite sauce. Great for parties.", price: 12000, stock: 0, image: "https://placehold.co/600x400", status: "out-of-stock" },
  { id: "PROD-004", name: "Chicken Breast (1kg)", description: "Lean and versatile boneless, skinless chicken breast. A healthy choice for any meal.", price: 20000, stock: 150, image: "https://placehold.co/600x400", status: "in-stock" },
  { id: "PROD-005", name: "Chicken Drumsticks (1kg)", description: "A family favorite, these drumsticks are meaty and flavorful. Perfect for frying or baking.", price: 16000, stock: 30, image: "https://placehold.co/600x400", status: "low-stock" },
];

const getStatus = (stock: number): Product['status'] => {
  if (stock === 0) return "out-of-stock";
  if (stock < 50) return "low-stock";
  return "in-stock";
};

export default function StockManagementPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [productForm, setProductForm] = useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const resetForm = () => {
      setProductForm({ name: "", description: "", price: "", stock: "", image: "" });
  };

  const validateForm = () => {
    if (!productForm.name || !productForm.price || !productForm.stock || !productForm.description) {
        toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
        return false;
    }
    const stock = parseInt(productForm.stock, 10);
    const price = parseFloat(productForm.price);
    if (isNaN(stock) || stock < 0 || isNaN(price) || price < 0) {
        toast({ title: "Error", description: "Please enter a valid stock and price.", variant: "destructive" });
        return false;
    }
    return true;
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setProductForm(prev => ({...prev, [id]: value}));
  };

  const handleAddProduct = () => {
    if (!validateForm()) return;
    
    const stock = parseInt(productForm.stock, 10);
    const newProduct: Product = {
        id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        stock: stock,
        status: getStatus(stock),
        image: productForm.image || 'https://placehold.co/600x400',
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({ title: "Success", description: "Product added successfully." });
  };
  
  const handleEditProduct = () => {
    if (!editingProduct || !validateForm()) return;
   
    const stock = parseInt(productForm.stock, 10);
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, 
            name: productForm.name, 
            description: productForm.description,
            price: parseFloat(productForm.price),
            stock: stock, 
            status: getStatus(stock),
            image: productForm.image || 'https://placehold.co/600x400',
           } 
        : p
    ));
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    resetForm();
    toast({ title: "Success", description: "Product updated successfully." });
  };
  
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({ title: "Success", description: "Product deleted successfully." });
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        stock: String(product.stock),
        image: product.image,
    });
    setIsEditDialogOpen(true);
  };
  
  const openAddDialog = () => {
      resetForm();
      setIsAddDialogOpen(true);
  };


  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>
          <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price (TZS)</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">{product.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={
                        product.status === "in-stock" ? "default" :
                          product.status === "low-stock" ? "secondary" : "destructive"
                      }>
                        {product.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                           <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the product.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                                        Continue
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={productForm.name} onChange={handleFormChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Description</Label>
              <Textarea id="description" value={productForm.description} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input id="price" type="number" value={productForm.price} onChange={handleFormChange} className="col-span-3" placeholder="e.g., 15000" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" type="number" value={productForm.stock} onChange={handleFormChange} className="col-span-3" placeholder="e.g., 100" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image URL</Label>
              <Input id="image" value={productForm.image} onChange={handleFormChange} className="col-span-3" placeholder="https://..."/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    setIsEditDialogOpen(false);
                    setEditingProduct(null);
                    resetForm();
                }}>Cancel</Button>
            </DialogClose>
            <Button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
                {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
