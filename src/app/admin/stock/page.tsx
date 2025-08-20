
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
import { PlusCircle } from "lucide-react"

const dummyProducts = [
  { id: "PROD-001", name: "Whole Chicken", stock: 120, status: "in-stock" },
  { id: "PROD-002", name: "Chicken Thighs (1kg)", stock: 80, status: "in-stock" },
  { id: "PROD-003", name: "Chicken Wings (1kg)", stock: 0, status: "out-of-stock" },
  { id: "PROD-004", name: "Chicken Breast (1kg)", stock: 150, status: "in-stock" },
  { id: "PROD-005", name: "Chicken Drumsticks (1kg)", stock: 30, status: "low-stock" },
];

export default function StockManagementPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>
        <Button>
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
              {dummyProducts.map((product) => (
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
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
