
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Product = {
  id: string;
  name: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
};

const initialProducts: Product[] = [
  { id: "PROD-001", name: "Whole Chicken", stock: 120, status: "in-stock" },
  { id: "PROD-002", name: "Chicken Thighs (1kg)", stock: 80, status: "in-stock" },
  { id: "PROD-003", name: "Chicken Wings (1kg)", stock: 0, status: "out-of-stock" },
  { id: "PROD-004", name: "Chicken Breast (1kg)", stock: 150, status: "in-stock" },
  { id: "PROD-005", name: "Chicken Drumsticks (1kg)", stock: 30, status: "low-stock" },
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
  const [newProductName, setNewProductName] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!newProductName || !newProductStock) {
        toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
        return;
    }
    const stock = parseInt(newProductStock, 10);
    if (isNaN(stock) || stock < 0) {
        toast({ title: "Error", description: "Please enter a valid stock number.", variant: "destructive" });
        return;
    }

    const newProduct: Product = {
        id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
        name: newProductName,
        stock: stock,
        status: getStatus(stock),
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    setNewProductName("");
    setNewProductStock("");
    toast({ title: "Success", description: "Product added successfully." });
  };
  
  const handleEditProduct = () => {
    if (!editingProduct || !newProductName || !newProductStock) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
     const stock = parseInt(newProductStock, 10);
    if (isNaN(stock) || stock < 0) {
        toast({ title: "Error", description: "Please enter a valid stock number.", variant: "destructive" });
        return;
    }

    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, name: newProductName, stock: stock, status: getStatus(stock) } 
        : p
    ));
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    setNewProductName("");
    setNewProductStock("");
    toast({ title: "Success", description: "Product updated successfully." });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductStock(String(product.stock));
    setIsEditDialogOpen(true);
  };


  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
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
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={
                        product.status === "in-stock" ? "default" :
                          product.status === "low-stock" ? "secondary" : "destructive"
                      }>
                        {product.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" type="number" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input id="edit-name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-stock" className="text-right">Stock</Label>
              <Input id="edit-stock" type="number" value={newProductStock} onChange={(e) => setNewProductStock(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
