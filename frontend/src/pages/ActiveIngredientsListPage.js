import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BlurText from "../components/BlurText";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
    CircularProgress,
    Alert,
    TextField,
    Button,
    Paper,
    Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ScienceIcon from "@mui/icons-material/Science";
import SortIcon from "@mui/icons-material/Sort";
import hoatChatData from "../data/hoat-chat.json";

const ActiveIngredientsListPage = () => {
    const [activeIngredients, setActiveIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // Load dữ liệu từ file JSON và khôi phục trạng thái
    useEffect(() => {
        setLoading(true);
        try {
            // Chuyển đổi mảng thành mảng các object với id và name
            const ingredients = hoatChatData.map((name, index) => ({
                id: index,
                name: name,
            }));
            setActiveIngredients(ingredients);
            
            // Khôi phục trạng thái từ sessionStorage
            const savedPage = sessionStorage.getItem('activeIngredientsPage');
            const savedSearch = sessionStorage.getItem('activeIngredientsSearch');
            const savedSortOrder = sessionStorage.getItem('activeIngredientsSortOrder');
            
            if (savedPage) {
                setPage(parseInt(savedPage, 10));
            }
            if (savedSearch) {
                setSearch(savedSearch);
            }
            if (savedSortOrder) {
                setSortOrder(savedSortOrder);
            }
            
            // Áp dụng filter nếu có search
            if (savedSearch && savedSearch.trim()) {
                const filtered = ingredients.filter((ingredient) =>
                    ingredient.name.toLowerCase().includes(savedSearch.toLowerCase())
                );
                setFilteredIngredients(filtered);
            } else {
                setFilteredIngredients(ingredients);
            }
            
            // Xóa các giá trị đã lưu sau khi khôi phục
            if (savedPage) sessionStorage.removeItem('activeIngredientsPage');
            if (savedSearch) sessionStorage.removeItem('activeIngredientsSearch');
            if (savedSortOrder) sessionStorage.removeItem('activeIngredientsSortOrder');
        } catch (error) {
            setError("Không thể tải dữ liệu hoạt chất. Vui lòng thử lại sau.");
            console.error("Error loading active ingredients:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Hàm tìm kiếm với debounce
    const performSearch = useCallback(
        (query) => {
            setIsSearching(true);
            setPage(1);

            if (!query.trim()) {
                setFilteredIngredients(activeIngredients);
                setIsSearching(false);
                return;
            }

            const filtered = activeIngredients.filter((ingredient) =>
                ingredient.name.toLowerCase().includes(query.toLowerCase())
            );

            setFilteredIngredients(filtered);
            setIsSearching(false);
        },
        [activeIngredients]
    );

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);

        // Clear timeout cũ
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Tạo timeout mới để debounce
        const newTimeout = setTimeout(() => {
            performSearch(query);
        }, 500); // Delay 500ms

        setSearchTimeout(newTimeout);
    };

    // Cleanup timeout khi component unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
        setPage(1);
    };

    // Sắp xếp dữ liệu
    const sortedIngredients = [...filteredIngredients].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.localeCompare(b.name, "vi");
        } else {
            return b.name.localeCompare(a.name, "vi");
        }
    });

    // Tính toán phân trang
    const totalPages = Math.ceil(sortedIngredients.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedIngredients = sortedIngredients.slice(startIndex, endIndex);

    const navigate = useNavigate();

    // Lưu vị trí scroll khi rời trang
    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.setItem('activeIngredientsScrollPosition', window.scrollY.toString());
        };
        
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Khôi phục vị trí scroll khi quay lại trang
    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem('activeIngredientsScrollPosition');
        if (savedScrollPosition) {
            // Delay một chút để đảm bảo DOM đã render
            setTimeout(() => {
                window.scrollTo({ top: parseInt(savedScrollPosition, 10), behavior: 'instant' });
                sessionStorage.removeItem('activeIngredientsScrollPosition');
            }, 100);
        }
    }, []);

    const handleViewInteractions = (ingredientName) => {
        // Lưu trạng thái trước khi navigate
        sessionStorage.setItem('activeIngredientsScrollPosition', window.scrollY.toString());
        sessionStorage.setItem('activeIngredientsPage', page.toString());
        sessionStorage.setItem('activeIngredientsSearch', search);
        sessionStorage.setItem('activeIngredientsSortOrder', sortOrder);
        navigate(
            `/active-ingredients/${encodeURIComponent(
                ingredientName
            )}/interactions`
        );
    };

    const handleAnimationComplete = () => {
        console.log("Hoàn thành hiệu ứng!");
    };

    return (
        <Box
            className="container"
            sx={{
                mt: { xs: 2, sm: 3, md: 5 },
                px: { xs: 1, sm: 2, md: 3 },
                pb: { xs: 2, sm: 3, md: 4 },
            }}
        >
            <Typography
                variant="h3"
                gutterBottom
                align="center"
                sx={{
                    mb: { xs: 2, sm: 3 },
                    fontWeight: "bold",
                    color: "primary.main",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    textTransform: "uppercase",
                    letterSpacing: { xs: 1, sm: 2 },
                    fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                    px: { xs: 1, sm: 0 },
                }}
            >
                <BlurText
                    text="Danh sách hoạt chất"
                    color="#ffffff"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-2xl mb-8"
                />
            </Typography>
            <Typography
                align="center"
                sx={{
                    mb: { xs: 2, sm: 3 },
                    color: "text.secondary",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
            >
                Xem danh mục tương tác theo tên hoạt chất
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: { xs: 2, sm: 3 },
                    gap: { xs: 1, sm: 2 },
                    flexWrap: "wrap",
                    px: { xs: 0.5, sm: 0 },
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Tìm kiếm hoạt chất..."
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: isSearching ? (
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                        ) : (
                            <SearchIcon sx={{ mr: 1, color: "grey.600" }} />
                        ),
                    }}
                    sx={{
                        width: "100%",
                        maxWidth: { xs: "100%", sm: 500 },
                        bgcolor: "white",
                        boxShadow: 2,
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            height: { xs: "48px", sm: "56px" },
                        },
                    }}
                />
            </Box>

            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: { xs: 3, sm: 5 },
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert
                    severity="error"
                    sx={{ mt: { xs: 2, sm: 3 }, mx: { xs: 0.5, sm: 0 } }}
                >
                    {error}
                </Alert>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <Box
                        sx={{
                            display: { xs: "block", md: "none" },
                            position: "relative",
                        }}
                    >
                        {isSearching && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    backdropFilter: "blur(2px)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 10,
                                    borderRadius: 2,
                                    minHeight: 200,
                                }}
                            >
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <CircularProgress />
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, color: "primary.main" }}
                                    >
                                        Đang tìm kiếm...
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <Box
                            sx={{
                                opacity: isSearching ? 0.6 : 1,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            {paginatedIngredients.map((ingredient) => (
                                <Paper
                                    key={ingredient.id}
                                    sx={{
                                        p: 2,
                                        mb: 2,
                                        boxShadow: 2,
                                        borderRadius: 2,
                                        "&:hover": {
                                            boxShadow: 4,
                                            transform: "translateY(-2px)",
                                            transition: "all 0.3s ease",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "bold",
                                                color: "primary.main",
                                                fontSize: "1.1rem",
                                                lineHeight: 1.2,
                                                flex: 1,
                                                mr: 1,
                                            }}
                                        >
                                            {ingredient.name}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            mt: 2,
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                                handleViewInteractions(
                                                    ingredient.name
                                                )
                                            }
                                            sx={{
                                                borderRadius: "8px",
                                            }}
                                        >
                                            Xem danh sách tương tác
                                        </Button>
                                    </Box>
                                </Paper>
                            ))}
                        </Box>
                    </Box>

                    {/* Desktop Table View */}
                    <Box
                        sx={{
                            position: "relative",
                            display: { xs: "none", md: "block" },
                        }}
                    >
                        {isSearching && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    backdropFilter: "blur(2px)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 10,
                                    borderRadius: 2,
                                }}
                            >
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <CircularProgress />
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, color: "primary.main" }}
                                    >
                                        Đang tìm kiếm...
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        <TableContainer
                            component={Paper}
                            sx={{
                                mt: { xs: 2, sm: 3 },
                                boxShadow: 3,
                                borderRadius: 2,
                                opacity: isSearching ? 0.6 : 1,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            <Table>
                                <TableHead sx={{ bgcolor: "primary.main" }}>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                color: "white",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                            onClick={handleSort}
                                        >
                                            <ScienceIcon sx={{ mr: 1 }} />
                                            Tên hoạt chất{" "}
                                            <SortIcon sx={{ ml: 1 }} />
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Hành động
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedIngredients.map((ingredient) => (
                                        <TableRow
                                            key={ingredient.id}
                                            sx={{
                                                "&:nth-of-type(odd)": {
                                                    bgcolor: "grey.100",
                                                },
                                                "&:hover": {
                                                    bgcolor: "grey.200",
                                                },
                                            }}
                                        >
                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight="bold"
                                                >
                                                    {ingredient.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Xem danh sách tương tác">
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="primary"
                                                        onClick={() =>
                                                            handleViewInteractions(
                                                                ingredient.name
                                                            )
                                                        }
                                                    >
                                                        Xem danh sách tương tác
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box
                        sx={{
                            mt: { xs: 3, sm: 4 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: { xs: 1, sm: 2 },
                            px: { xs: 0.5, sm: 0 },
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                        >
                            Trang {page} trên {totalPages} (
                            {sortedIngredients.length} hoạt chất)
                        </Typography>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => {
                                setPage(value);
                            }}
                            color="primary"
                            showFirstButton={totalPages > 5}
                            showLastButton={totalPages > 5}
                            size={window.innerWidth < 600 ? "small" : "medium"}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                    minWidth: { xs: "28px", sm: "32px" },
                                    height: { xs: "28px", sm: "32px" },
                                    "&:hover": {
                                        bgcolor: "primary.light",
                                        color: "white",
                                    },
                                    "&.Mui-selected": {
                                        bgcolor: "primary.main",
                                        color: "white",
                                        fontWeight: "bold",
                                    },
                                },
                                "& .MuiPaginationItem-ellipsis": {
                                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                },
                            }}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ActiveIngredientsListPage;
