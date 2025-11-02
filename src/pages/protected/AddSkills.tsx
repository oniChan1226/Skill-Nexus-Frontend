import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Link, useSearchParams } from "react-router-dom";
import Button from "@/components/shared/Button";
import { IconArrowLeft, IconPlus, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  useAddOfferedSkillMutation,
  useAddRequiredSkillMutation,
} from "@/services/skills.service";
import {
  offeredSkillSchema,
  requiredSkillSchema,
  type OfferedSkill,
  type RequiredSkill,
} from "@/schemas/SkillsSchema";
import { toast } from "react-toastify";

const AddSkills = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tabValue, setTabValue] = useState(
    searchParams.get("tab") || "offered"
  );

  // API Hooks
  const [addOfferedSkill, { isLoading: isAddingOffered }] =
    useAddOfferedSkillMutation();
  const [addRequiredSkill, { isLoading: isAddingRequired }] =
    useAddRequiredSkillMutation();

  // Offered Skill Form State
  const [offeredForm, setOfferedForm] = useState<OfferedSkill>({
    name: "",
    proficiencyLevel: "beginner",
    description: "",
    categories: [],
  });
  const [offeredCategoryInput, setOfferedCategoryInput] = useState("");
  const [offeredErrors, setOfferedErrors] = useState<Record<string, string>>(
    {}
  );

  // Required Skill Form State
  const [requiredForm, setRequiredForm] = useState<RequiredSkill>({
    name: "",
    learningPriority: "medium",
    description: "",
    categories: [],
  });
  const [requiredCategoryInput, setRequiredCategoryInput] = useState("");
  const [requiredErrors, setRequiredErrors] = useState<Record<string, string>>(
    {}
  );

  // keep URL and state in sync
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab && currentTab !== tabValue) {
      setTabValue(currentTab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setTabValue(value);
    setSearchParams({ tab: value });
  };

  // === OFFERED SKILL HANDLERS ===
  const handleOfferedCategoryAdd = () => {
    if (offeredCategoryInput.trim()) {
      setOfferedForm({
        ...offeredForm,
        categories: [...(offeredForm.categories || []), offeredCategoryInput.trim()],
      });
      setOfferedCategoryInput("");
    }
  };

  const handleOfferedCategoryRemove = (index: number) => {
    setOfferedForm({
      ...offeredForm,
      categories: offeredForm.categories?.filter((_, i) => i !== index),
    });
  };

  const handleOfferedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfferedErrors({});

    try {
      // Validate with Zod
      const validatedData = offeredSkillSchema.parse(offeredForm);

      // Call API
      await addOfferedSkill(validatedData).unwrap();
      toast.success("Offered skill added successfully!");
      
      // Reset form
      setOfferedForm({
        name: "",
        proficiencyLevel: "beginner",
        description: "",
        categories: [],
      });
    } catch (error: any) {
      if (error.issues) {
        // Zod validation errors
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach((issue: any) => {
          formattedErrors[issue.path[0]] = issue.message;
        });
        setOfferedErrors(formattedErrors);
        toast.error("Please fix the form errors");
      } else {
        // API errors
        toast.error(error.data?.message || "Failed to add offered skill");
      }
    }
  };

  // === REQUIRED SKILL HANDLERS ===
  const handleRequiredCategoryAdd = () => {
    if (requiredCategoryInput.trim()) {
      setRequiredForm({
        ...requiredForm,
        categories: [...(requiredForm.categories || []), requiredCategoryInput.trim()],
      });
      setRequiredCategoryInput("");
    }
  };

  const handleRequiredCategoryRemove = (index: number) => {
    setRequiredForm({
      ...requiredForm,
      categories: requiredForm.categories?.filter((_, i) => i !== index),
    });
  };

  const handleRequiredSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequiredErrors({});

    try {
      // Validate with Zod
      const validatedData = requiredSkillSchema.parse(requiredForm);

      // Call API
      await addRequiredSkill(validatedData).unwrap();
      toast.success("Required skill added successfully!");
      
      // Reset form
      setRequiredForm({
        name: "",
        learningPriority: "medium",
        description: "",
        categories: [],
      });
    } catch (error: any) {
      if (error.issues) {
        // Zod validation errors
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach((issue: any) => {
          formattedErrors[issue.path[0]] = issue.message;
        });
        setRequiredErrors(formattedErrors);
        toast.error("Please fix the form errors");
      } else {
        // API errors
        toast.error(error.data?.message || "Failed to add required skill");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* === BREADCRUMB === */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add Skills</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <IconArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>

      {/* === MAIN CARD === */}
      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-md bg-white dark:bg-neutral-950">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            Add New Skill
          </CardTitle>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Add skills you want to offer or learn. These will appear in your
            profile and help others connect with you.
          </p>
        </CardHeader>

        <CardContent>
          <Tabs
            value={tabValue}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full dark:bg-neutral-900/90">
              <TabsTrigger
                value="offered"
                className="data-[state=active]:dark:bg-neutral-800 data-[state=active]:dark:text-white data-[state=active]:dark:border-neutral-700 shadow-sm transition-all"
              >
                Offered Skill
              </TabsTrigger>
              <TabsTrigger
                value="required"
                className="data-[state=active]:dark:bg-neutral-800 data-[state=active]:dark:text-white data-[state=active]:dark:border-neutral-700 shadow-sm transition-all"
              >
                Required Skill
              </TabsTrigger>
            </TabsList>

            {/* === OFFERED SKILL TAB === */}
            <TabsContent value="offered" className="mt-6">
              <form onSubmit={handleOfferedSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="dark:text-white">
                      Skill Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Web Development"
                      value={offeredForm.name}
                      onChange={(e) =>
                        setOfferedForm({ ...offeredForm, name: e.target.value })
                      }
                      className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                    {offeredErrors.name && (
                      <p className="text-sm text-red-500">{offeredErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="level" className="dark:text-white">
                      Proficiency Level *
                    </Label>
                    <Select
                      value={offeredForm.proficiencyLevel}
                      onValueChange={(value: any) =>
                        setOfferedForm({ ...offeredForm, proficiencyLevel: value })
                      }
                    >
                      <SelectTrigger className="w-full bg-neutral-50 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-800 dark:hover:bg-neutral-700/60 dark:text-neutral-100">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700">
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    {offeredErrors.proficiencyLevel && (
                      <p className="text-sm text-red-500">
                        {offeredErrors.proficiencyLevel}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="category" className="dark:text-white">
                    Categories
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="category"
                      placeholder="e.g. Programming, Design"
                      value={offeredCategoryInput}
                      onChange={(e) => setOfferedCategoryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleOfferedCategoryAdd();
                        }
                      }}
                      className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                    <Button
                      type="button"
                      onClick={handleOfferedCategoryAdd}
                      // variant="secondary"
                      className="px-4"
                    >
                      Add
                    </Button>
                  </div>
                  {offeredErrors.categories && (
                    <p className="text-sm text-red-500">
                      {offeredErrors.categories}
                    </p>
                  )}
                  {offeredForm.categories && offeredForm.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {offeredForm.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm"
                        >
                          {cat}
                          <button
                            type="button"
                            onClick={() => handleOfferedCategoryRemove(index)}
                            className="hover:bg-indigo-200 dark:hover:bg-indigo-800/50 rounded-full p-0.5"
                          >
                            <IconX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="desc" className="dark:text-white">
                    Description
                  </Label>
                  <Textarea
                    id="desc"
                    placeholder="Describe your skill, tools you use, or your experience..."
                    value={offeredForm.description}
                    onChange={(e) =>
                      setOfferedForm({ ...offeredForm, description: e.target.value })
                    }
                    maxLength={300}
                    className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                  {offeredErrors.description && (
                    <p className="text-sm text-red-500">
                      {offeredErrors.description}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {offeredForm.description?.length || 0}/300 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isAddingOffered}
                  className="flex items-center gap-2 px-4 py-2 mt-3"
                >
                  <IconPlus size={18} />
                  {isAddingOffered ? "Adding..." : "Add Offered Skill"}
                </Button>
              </form>
            </TabsContent>

            {/* === REQUIRED SKILL TAB === */}
            <TabsContent value="required" className="mt-6">
              <form onSubmit={handleRequiredSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="rname" className="dark:text-white">
                      Skill Name *
                    </Label>
                    <Input
                      id="rname"
                      placeholder="e.g. Public Speaking"
                      value={requiredForm.name}
                      onChange={(e) =>
                        setRequiredForm({ ...requiredForm, name: e.target.value })
                      }
                      className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                    {requiredErrors.name && (
                      <p className="text-sm text-red-500">{requiredErrors.name}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="priority" className="dark:text-white">
                      Learning Priority *
                    </Label>
                    <Select
                      value={requiredForm.learningPriority}
                      onValueChange={(value: any) =>
                        setRequiredForm({ ...requiredForm, learningPriority: value })
                      }
                    >
                      <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-800 dark:hover:bg-neutral-700/60 dark:text-neutral-100">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    {requiredErrors.learningPriority && (
                      <p className="text-sm text-red-500">
                        {requiredErrors.learningPriority}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rcategory" className="dark:text-white">
                    Categories
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="rcategory"
                      placeholder="e.g. Communication, Leadership"
                      value={requiredCategoryInput}
                      onChange={(e) => setRequiredCategoryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleRequiredCategoryAdd();
                        }
                      }}
                      className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                    />
                    <Button
                      type="button"
                      onClick={handleRequiredCategoryAdd}
                      variant="secondary"
                      className="shrink-0"
                    >
                      Add
                    </Button>
                  </div>
                  {requiredErrors.categories && (
                    <p className="text-sm text-red-500">
                      {requiredErrors.categories}
                    </p>
                  )}
                  {requiredForm.categories && requiredForm.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {requiredForm.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm"
                        >
                          {cat}
                          <button
                            type="button"
                            onClick={() => handleRequiredCategoryRemove(index)}
                            className="hover:bg-indigo-200 dark:hover:bg-indigo-800/50 rounded-full p-0.5"
                          >
                            <IconX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rdesc" className="dark:text-white">
                    Description
                  </Label>
                  <Textarea
                    id="rdesc"
                    placeholder="Why do you want to learn this skill? What are your goals?"
                    value={requiredForm.description}
                    onChange={(e) =>
                      setRequiredForm({ ...requiredForm, description: e.target.value })
                    }
                    maxLength={300}
                    className="bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100"
                  />
                  {requiredErrors.description && (
                    <p className="text-sm text-red-500">
                      {requiredErrors.description}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {requiredForm.description?.length || 0}/300 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isAddingRequired}
                  className="flex items-center gap-2 px-4 py-2 mt-3"
                >
                  <IconPlus size={18} />
                  {isAddingRequired ? "Adding..." : "Add Required Skill"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSkills;
